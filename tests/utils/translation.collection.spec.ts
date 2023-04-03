import { expect } from 'chai';

import { TranslationCollection } from '../../src/utils/translation.collection.js';

describe('StringCollection', () => {
	let collection: TranslationCollection;

	beforeEach(() => {
		collection = new TranslationCollection();
	});

	it('should initialize with key/value pairs', () => {
		collection = new TranslationCollection({ key1: { value: 'val1' }, key2: { value: 'val2' } });
		expect(collection.values).to.deep.equal({ key1: { value: 'val1' }, key2: { value: 'val2' } });
	});

	it('should add key with value', () => {
		const newCollection = collection.add('theKey', { value: 'theVal' });
		expect(newCollection.get('theKey')).to.deep.equal({ value: 'theVal' });
	});

	it('should add key with default value', () => {
		collection = collection.add('theKey', { value: '' });
		expect(collection.get('theKey')).to.deep.equal({ value: '' });
	});

	it('should not mutate collection when adding key', () => {
		collection.add('theKey', { value: 'theVal' });
		expect(collection.has('theKey')).to.equal(false);
	});

	it('should add array of keys with default value', () => {
		collection = collection.addKeys(['key1', 'key2'], [{ value: '' }, { value: '' }]);
		expect(collection.values).to.deep.equal({ key1: { value: '' }, key2: { value: '' } });
	});

	it('should return true when collection has key', () => {
		collection = collection.add('key', { value: '' });
		expect(collection.has('key')).to.equal(true);
	});

	it('should return false when collection does not have key', () => {
		expect(collection.has('key')).to.equal(false);
	});

	it('should remove key', () => {
		collection = new TranslationCollection({ removeThisKey: { value: '' } });
		collection = collection.remove('removeThisKey');
		expect(collection.has('removeThisKey')).to.equal(false);
	});

	it('should not mutate collection when removing key', () => {
		collection = new TranslationCollection({ removeThisKey: { value: '' } });
		collection.remove('removeThisKey');
		expect(collection.has('removeThisKey')).to.equal(true);
	});

	it('should return number of keys', () => {
		collection = collection.addKeys(['key1', 'key2', 'key3'], [{ value: '' }, { value: '' }, { value: '' }]);
		expect(collection.count()).to.equal(3);
	});

	it('should merge with other collection', () => {
		collection = collection.add('oldKey', { value: 'oldVal' });
		const newCollection = new TranslationCollection({ newKey: { value: 'newVal' } });
		expect(collection.union(newCollection).values).to.deep.equal({
			oldKey: { value: 'oldVal' },
			newKey: { value: 'newVal' }
		});
	});

	it('should intersect with passed collection', () => {
		collection = collection.addKeys(['red', 'green', 'blue'], [{ value: '' }, { value: '' }, { value: '' }]);
		const newCollection = new TranslationCollection({ red: { value: '' }, blue: { value: '' } });
		expect(collection.intersect(newCollection).values).to.deep.equal({ red: { value: '' }, blue: { value: '' } });
	});

	it('should intersect with passed collection and keep original values', () => {
		collection = new TranslationCollection({ red: { value: 'rød' }, green: { value: 'grøn' }, blue: { value: 'blå' } });
		const newCollection = new TranslationCollection({ red: { value: 'no value' }, blue: { value: 'also no value' } });
		expect(collection.intersect(newCollection).values).to.deep.equal({ red: { value: 'rød' }, blue: { value: 'blå' } });
	});

	it('should sort keys alphabetically', () => {
		collection = new TranslationCollection({ red: { value: 'rød' }, green: { value: 'grøn' }, blue: { value: 'blå' } });
		collection = collection.sort();
		expect(collection.keys()).deep.equal(['blue', 'green', 'red']);
	});

	it('should map values', () => {
		collection = new TranslationCollection({ red: { value: 'rød' }, green: { value: 'grøn' }, blue: { value: 'blå' } });
		collection = collection.map((key, val) => ({ value: 'mapped value' }));
		expect(collection.values).to.deep.equal({
			red: { value: 'mapped value' },
			green: { value: 'mapped value' },
			blue: { value: 'mapped value' }
		});
	});
});
