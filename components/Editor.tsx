'use client';

import React from 'react';
import { JournalEntry } from '@prisma/client';
import { editEntry } from '@/api/entries.api';
import useDebounce from './hooks/useDebounce';
import Spinner from './Spinner';

type EditorProps = { entry: JournalEntry };

const Editor = ({ entry }: EditorProps) => {
	const [value, setValue] = React.useState(entry.content);
	const [isSaving, setIsSaving] = React.useState(false);

	const saveEntry = React.useCallback(() => {
		setIsSaving(true);

		editEntry({ id: entry.id, content: value }).finally(() =>
			setIsSaving(false)
		);
	}, [entry.id, value]);

	useDebounce({ value, wait: 1000, onWaitEnd: saveEntry });

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
