export function isNil(value: unknown): value is null | undefined {
	// eslint-disable-next-line eqeqeq
	return value == null;
}
