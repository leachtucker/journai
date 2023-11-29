import React from 'react';

type UseDebounceProps = { value: unknown; wait: number; onWaitEnd: () => void };

const useDebounce = ({ value, wait, onWaitEnd }: UseDebounceProps) => {
	const timerRef = React.useRef<NodeJS.Timeout>();
	React.useEffect(() => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}

		const timer = setTimeout(onWaitEnd, wait);
		timerRef.current = timer;

		() => {
			clearTimeout(timerRef.current);
		};
	}, [value, wait, onWaitEnd]);
};

export default useDebounce;
