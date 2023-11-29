'use client';

import React from 'react';
import { JournalEntry } from '@prisma/client';
import { editEntry } from '@/api/entries.api';
import useDebounce from './hooks/useDebounce';

type EditorProps = { entry: JournalEntry };

const Editor = ({ entry }: EditorProps) => {
	const [value, setValue] = React.useState(entry.content);

	const saveEntry = React.useCallback(
		() => editEntry({ id: entry.id, content: value }),
		[entry.id, value]
	);

	useDebounce({ value, wait: 500, onWaitEnd: saveEntry });

	return (
		<div className="w-full h-full">
			<textarea
				value={value}
				onChange={(e) => setValue(e.target.value)}
				className="w-full h-full p-8 text-xl"
			/>
		</div>
	);
};

export default Editor;
