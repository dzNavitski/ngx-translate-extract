import { TranslationCollection } from '../utils/translation.collection.js';
import pkg from 'gettext-parser';
const { po } = pkg;
export class PoCompiler {
	extension = 'po';
	domain = '';
	project = '';
	constructor(options) {
		if (options.project) {
			this.project = options.project;
		}
	}
	compile(collection) {
		const data = {
			charset: 'utf-8',
			headers: {
				'mime-version': '1.0',
				'content-type': 'text/plain; charset=utf-8',
				'content-transfer-encoding': '8bit'
			},
			translations: {
				[this.domain]: Object.keys(collection.values).reduce((translations, key) => {
					const translationData = collection.get(key);
					const updateReference = (ref) => {
						const pattern = new RegExp(`^.*?\\/${this.project}`);
						return ref.replace(pattern, this.project);
					};
					return {
						...translations,
						[key]: {
							msgid: key,
							msgstr: translationData.value,
							comments: {
								reference: translationData.reference ? translationData.reference.map((ref) => updateReference(ref)).join('\n') : undefined
							}
						}
					};
				}, {})
			}
		};
		return po.compile(data).toString('utf8');
	}
	parse(contents) {
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
			}, {});
		return new TranslationCollection(values);
	}
}
//# sourceMappingURL=po.compiler.js.map
