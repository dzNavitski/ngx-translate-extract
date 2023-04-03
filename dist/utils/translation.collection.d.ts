export interface TranslationData {
	value: string;
	reference?: string[];
}
export interface TranslationType {
	[key: string]: TranslationData;
}
export declare class TranslationCollection {
	values: TranslationType;
	constructor(values?: TranslationType);
	add(key: string, val: TranslationData): TranslationCollection;
	addKeys(keys: string[], data: TranslationData[]): TranslationCollection;
	remove(key: string): TranslationCollection;
	forEach(callback: (key?: string, data?: TranslationData) => void): TranslationCollection;
	filter(callback: (key?: string, data?: TranslationData) => boolean): TranslationCollection;
	map(callback: (key?: string, data?: TranslationData) => TranslationData): TranslationCollection;
	union(collection: TranslationCollection): TranslationCollection;
	intersect(collection: TranslationCollection): TranslationCollection;
	has(key: string): boolean;
	get(key: string): TranslationData;
	keys(): string[];
	count(): number;
	isEmpty(): boolean;
	sort(compareFn?: (a: string, b: string) => number): TranslationCollection;
}
