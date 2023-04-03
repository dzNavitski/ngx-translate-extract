export interface TranslationData {
	value: string;
	reference?: string[];
}
export interface TranslationType {
	[key: string]: TranslationData;
}

export class TranslationCollection {
	public values: TranslationType = {};

	public constructor(values: TranslationType = {}) {
		this.values = values;
	}

	public add(key: string, val: TranslationData): TranslationCollection {
		return new TranslationCollection({ ...this.values, [key]: val });
	}

	public addKeys(keys: string[], data: TranslationData[]): TranslationCollection {
		const values = keys.reduce((results, key, i) => {
			results[key] = data && data[i] ? data[i] : { value: '' };
			return results;
		}, {} as TranslationType);
		return new TranslationCollection({ ...this.values, ...values });
	}

	public remove(key: string): TranslationCollection {
		return this.filter((k) => key !== k);
	}

	public forEach(callback: (key?: string, data?: TranslationData) => void): TranslationCollection {
		Object.keys(this.values).forEach((key) => callback.call(this, key, this.values[key]));
		return this;
	}

	public filter(callback: (key?: string, data?: TranslationData) => boolean): TranslationCollection {
		const values: TranslationType = {};
		this.forEach((key: string, data: TranslationData) => {
			if (callback.call(this, key, data)) {
				values[key] = data;
			}
		});
		return new TranslationCollection(values);
	}

	public map(callback: (key?: string, data?: TranslationData) => TranslationData): TranslationCollection {
		const values: TranslationType = {};
		this.forEach((key: string, data: TranslationData) => {
			values[key] = callback.call(this, key, data);
		});
		return new TranslationCollection(values);
	}

	public union(collection: TranslationCollection): TranslationCollection {
		const values1 = collection.values;
		const values2 = this.values;

		if (values1 && values2) {
			const keys1: string[] = Object.keys(values1);
			const keys2: string[] = Object.keys(values2);

			keys1.forEach((key: string) => {
				const ref1 = values1[key] ? values1[key].reference : undefined;
				const ref2 = values2[key] ? values2[key].reference : undefined;

				if (ref1 && ref2) {
					values1[key].reference = [...ref1, ...ref2];
				}
			});
		}

		return new TranslationCollection({ ...this.values, ...collection.values });
	}

	public intersect(collection: TranslationCollection): TranslationCollection {
		const values: TranslationType = {};
		this.filter((key) => collection.has(key)).forEach((key: string, data: TranslationData) => {
			values[key] = data;
		});

		return new TranslationCollection(values);
	}

	public has(key: string): boolean {
		return this.values.hasOwnProperty(key);
	}

	public get(key: string): TranslationData {
		return this.values[key];
	}

	public keys(): string[] {
		return Object.keys(this.values);
	}

	public count(): number {
		return Object.keys(this.values).length;
	}

	public isEmpty(): boolean {
		return Object.keys(this.values).length === 0;
	}

	public sort(compareFn?: (a: string, b: string) => number): TranslationCollection {
		const values: TranslationType = {};
		this.keys()
			.sort(compareFn)
			.forEach((key) => {
				values[key] = this.get(key);
			});

		return new TranslationCollection(values);
	}
}
