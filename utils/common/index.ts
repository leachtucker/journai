export const sleep = async (wait: number) => {
	await new Promise((resolve) => {
		setTimeout(() => resolve(''), wait);
	});
};

export const getURLForPath = (path: string) => {
	return `${window.location.origin}${path}`;
};

export function isPromise(val: any): val is Promise<unknown> {
	return typeof val?.then == 'function';
}
