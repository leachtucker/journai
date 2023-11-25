export const sleep = async (wait: number) => {
	await new Promise((resolve) => {
		setTimeout(() => resolve(''), wait);
	});
};
