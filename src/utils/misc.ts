export const callAll =
	(...fns: (Function | undefined)[]) =>
	(...args: any[]) =>
		fns.forEach((fn) => fn && fn(...args));
