import { CompilerInterface } from './compiler.interface.js';
import { TranslationCollection, TranslationData, TranslationType } from '../utils/translation.collection.js';

import pkg from 'gettext-parser';
const { po } = pkg;

export class PoCompiler implements CompilerInterface {
	public extension: string = 'po';

	/**
	 * Translation domain
	 */
	public domain: string = '';

	public constructor(options?: any) {}

	public compile(collection: TranslationCollection): string {
		const data: any = {
			charset: 'utf-8',
			headers: {
				'mime-version': '1.0',
				'content-type': 'text/plain; charset=utf-8',
				'content-transfer-encoding': '8bit'
			},
			translations: {
				[this.domain]: Object.keys(collection.values).reduce((translations, key) => {
					const translationData: TranslationData = collection.get(key);
					return {
						...translations,
						[key]: {
							msgid: key,
							msgstr: translationData.value,
							comments: {
								reference: translationData.reference ? translationData.reference.join('\n') : undefined
							}
						}
					};
				}, {} as any)
			}
		};

		return po.compile(data).toString('utf8');
	}

	public parse(contents: string): TranslationCollection {
		const collection = new TranslationCollection();

		const parsedPo = po.parse(contents, 'utf8');

		if (!parsedPo.translations.hasOwnProperty(this.domain)) {
			return collection;
		}

		const values = Object.keys(parsedPo.translations[this.domain])
			.filter((key) => key.length > 0)
			.reduce((result, key) => {
				const poValue = parsedPo.translations[this.domain][key];
				return {
					...result,
					[key]: {
						value: poValue.msgstr.pop(),
						reference: poValue.comments && poValue.comments.reference ? poValue.comments.reference.split('\n') : undefined
					}
				};
			}, {} as TranslationType);

		return new TranslationCollection(values);
	}
}
