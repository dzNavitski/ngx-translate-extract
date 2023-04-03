import { expect } from 'chai';

import { PostProcessorInterface } from '../../src/post-processors/post-processor.interface.js';
import { KeyAsDefaultValuePostProcessor } from '../../src/post-processors/key-as-default-value.post-processor.js';
import { TranslationCollection } from '../../src/utils/translation.collection.js';

describe('KeyAsDefaultValuePostProcessor', () => {
	let processor: PostProcessorInterface;

	beforeEach(() => {
		processor = new KeyAsDefaultValuePostProcessor();
	});

	it('should use key as default value', () => {
		const collection = new TranslationCollection({
			'I have no value': { value: '' },
			'I am already translated': { value: 'Jeg er allerede oversat' },
			'Use this key as value as well': { value: '' }
		});
		const extracted = new TranslationCollection();
		const existing = new TranslationCollection();

		expect(processor.process(collection, extracted, existing).values).to.deep.equal({
			'I have no value': { value: 'I have no value' },
			'I am already translated': { value: 'Jeg er allerede oversat' },
			'Use this key as value as well': { value: 'Use this key as value as well' }
		});
	});
});
