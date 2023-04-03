import { expect } from 'chai';

import { PostProcessorInterface } from '../../src/post-processors/post-processor.interface.js';
import { PurgeObsoleteKeysPostProcessor } from '../../src/post-processors/purge-obsolete-keys.post-processor.js';
import { TranslationCollection } from '../../src/utils/translation.collection.js';

describe('PurgeObsoleteKeysPostProcessor', () => {
	let postProcessor: PostProcessorInterface;

	beforeEach(() => {
		postProcessor = new PurgeObsoleteKeysPostProcessor();
	});

	it('should purge obsolete keys', () => {
		const draft = new TranslationCollection({
			'I am completely new': { value: '' },
			'I already exist': { value: '' },
			'I already exist but was not present in extract': { value: '' }
		});
		const extracted = new TranslationCollection({
			'I am completely new': { value: '' },
			'I already exist': { value: '' }
		});
		const existing = new TranslationCollection({
			'I already exist': { value: '' },
			'I already exist but was not present in extract': { value: '' }
		});

		expect(postProcessor.process(draft, extracted, existing).values).to.deep.equal({
			'I am completely new': { value: '' },
			'I already exist': { value: '' }
		});
	});
});
