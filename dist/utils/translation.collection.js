export class TranslationCollection {
	values = {};
	constructor(values = {}) {
		this.values = values;
	}
	add(key, val) {
		return new TranslationCollection({ ...this.values, [key]: val });
	}
	addKeys(keys, data) {
		const values = keys.reduce((results, key, i) => {
			results[key] = data && data[i] ? data[i] : { value: '' };
			return results;
		}, {});
		return new TranslationCollection({ ...this.values, ...values });
	}
	remove(key) {
		return this.filter((k) => key !== k);
	}
	forEach(callback) {
		Object.keys(this.values).forEach((key) => callback.call(this, key, this.values[key]));
		return this;
	}
	filter(callback) {
		const values = {};
		this.forEach((key, data) => {
			if (callback.call(this, key, data)) {
				values[key] = data;
			}
		});
		return new TranslationCollection(values);
	}
	map(callback) {
		const values = {};
		this.forEach((key, data) => {
			values[key] = callback.call(this, key, data);
		});
		return new TranslationCollection(values);
	}
	union(collection) {
		const values1 = collection.values;
		const values2 = this.values;
		if (values1 && values2) {
			const keys1 = Object.keys(values1);
			const keys2 = Object.keys(values2);
			keys1.forEach((key) => {
				const ref1 = values1[key] ? values1[key].reference : undefined;
				const ref2 = values2[key] ? values2[key].reference : undefined;
				if (ref1 && ref2) {
					values1[key].reference = [...ref1, ...ref2];
				}
			});
		}
		return new TranslationCollection({ ...this.values, ...collection.values });
	}
	intersect(collection) {
		const values = {};
		this.filter((key) => collection.has(key)).forEach((key, data) => {
			values[key] = data;
		});
		return new TranslationCollection(values);
	}
	has(key) {
		return this.values.hasOwnProperty(key);
	}
	get(key) {
		return this.values[key];
	}
	keys() {
		return Object.keys(this.values);
	}
	count() {
		return Object.keys(this.values).length;
	}
	isEmpty() {
		return Object.keys(this.values).length === 0;
	}
	sort(compareFn) {
		const values = {};
		this.keys()
			.sort(compareFn)
			.forEach((key) => {
				values[key] = this.get(key);
			});
		return new TranslationCollection(values);
	}
}
//# sourceMappingURL=translation.collection.js.map
