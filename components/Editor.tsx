'use client';

import { JournalEntry } from '@prisma/client';
import React from 'react';

type EditorProps = { entry: JournalEntry };

const Editor = ({ entry }: EditorProps) => {
	const [value, setValue] = React.useState(entry.content);

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
