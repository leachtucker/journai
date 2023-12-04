'use client';

import React from 'react';
import useDebounce from './hooks/useDebounce';
import { isPromise } from '@/utils/common';

type EditorProps = {
	initialValue: string;
	onSave: (value: string) => Promise<any> | void;
};

const Editor = ({ initialValue, onSave }: EditorProps) => {
	const [value, setValue] = React.useState(initialValue);
	const [isSaving, setIsSaving] = React.useState(false);

	const save = React.useCallback(() => {
		setIsSaving(true);

		const req = onSave(value);
		if (isPromise(req)) {
			req.finally(() => setIsSaving(false));
		} else {
			setIsSaving(false);
		}
	}, [value, onSave]);

	useDebounce({ value, wait: 1000, onWaitEnd: save });

	return (
		<div className="w-full h-full relative overflow-hidden">
			<textarea
				value={value}
				onChange={(e) => setValue(e.target.value)}
				className="w-full h-full p-8 text-xl"
			/>

			{isSaving ? <SavingIndicator /> : null}
		</div>
	);
};

export default Editor;

const SavingIndicator = () => {
	return (
		<div className="absolute right-4 top-4">
			<div className="flex items-center gap-4 px-4 py-2 bg-indigo-500/20 rounded">
				<span className="animate-pulse">Saving</span>
			</div>
		</div>
	);
};
