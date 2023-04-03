import { expect } from 'chai';

import { PostProcessorInterface } from '../../src/post-processors/post-processor.interface.js';
import { StringAsDefaultValuePostProcessor } from '../../src/post-processors/string-as-default-value.post-processor.js';
import { TranslationCollection } from '../../src/utils/translation.collection.js';

describe('StringAsDefaultValuePostProcessor', () => {
	let processor: PostProcessorInterface;

	beforeEach(() => {
		processor = new StringAsDefaultValuePostProcessor({ defaultValue: 'default' });
	});

	it('should use string as default value', () => {
		const draft = new TranslationCollection({ 'String A': { value: '' } });
		const extracted = new TranslationCollection({ 'String A': { value: '' } });
		const existing = new TranslationCollection();
		expect(processor.process(draft, extracted, existing).values).to.deep.equal({
			'String A': { value: 'default' }
		});
	});

	it('should keep existing value even if it is an empty string', () => {
		const draft = new TranslationCollection({ 'String A': { value: '' } });
		const extracted = new TranslationCollection({ 'String A': { value: '' } });
		const existing = new TranslationCollection({ 'String A': { value: '' } });
		expect(processor.process(draft, extracted, existing).values).to.deep.equal({
			'String A': { value: '' }
		});
	});

	it('should keep existing value', () => {
		const draft = new TranslationCollection({ 'String A': { value: 'Streng A' } });
		const extracted = new TranslationCollection({ 'String A': { value: 'Streng A' } });
		const existing = new TranslationCollection({ 'String A': { value: 'Streng A' } });
		expect(processor.process(draft, extracted, existing).values).to.deep.equal({
			'String A': { value: 'Streng A' }
		});
	});
});
