export const callAll =
	(...fns: (Function | undefined)[]) =>
	(...args: any[]) =>
		fns.forEach((fn) => fn && fn(...args));

export const jsonStringify = <T>(value: T, spacing = 4) => JSON.stringify(value, null, spacing);
