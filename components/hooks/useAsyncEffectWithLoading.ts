import React from 'react';

type UseAsyncEffectWithLoadingProps = {
	effect: () => Promise<void>;
};

const useAsyncEffectWithLoading = (props: UseAsyncEffectWithLoadingProps) => {
	const [isLoading, setIsLoading] = React.useState(false);

	const run = () => {
		setIsLoading(true);

		const effectPromise = props.effect();
		effectPromise.finally(() => {
			setIsLoading(false);
		});

		return effectPromise;
	};

	return {
		isLoading,
		run,
	};
};

export default useAsyncEffectWithLoading;
