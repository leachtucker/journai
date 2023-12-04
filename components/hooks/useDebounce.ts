import React from 'react';

type UseDebounceProps = { value: unknown; wait: number; onWaitEnd: () => void };

const useDebounce = ({ value, wait, onWaitEnd }: UseDebounceProps) => {
	const timerRef = React.useRef<NodeJS.Timeout>();
	const prevValueAtWaitEnd = React.useRef<unknown>(value);
	React.useEffect(() => {
		if (value == prevValueAtWaitEnd.current) return;
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}

		const timer = setTimeout(() => {
			onWaitEnd();
			prevValueAtWaitEnd.current = value;
		}, wait);

		timerRef.current = timer;

		return () => {
			clearTimeout(timerRef.current);
		};
	}, [value, wait, onWaitEnd]);
};

export default useDebounce;
