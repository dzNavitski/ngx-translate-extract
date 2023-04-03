export class KeyAsDefaultValuePostProcessor {
	name = 'KeyAsDefaultValue';
	process(draft, extracted, existing) {
		return draft.map((key, data) => (data.value === '' ? { ...data, value: key } : data));
	}
}
//# sourceMappingURL=key-as-default-value.post-processor.js.map
