export function escapeMDString(value: string): string {
	return value.replaceAll('.', '\\.');
}
