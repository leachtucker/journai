'use client';

import React from 'react';

import Editor from '@/components/Editor';
import AnalysisSummary from './AnalysisSummary';
import { editEntry, getEntry } from '@/api/entries.api';
import { JournalEntryWithAnalysis } from '@/utils/entries';

type EditEntryFormProps = { entry: JournalEntryWithAnalysis };

const EditEntryForm = (props: EditEntryFormProps) => {
	const [entry, setEntry] = React.useState<JournalEntryWithAnalysis>(
		props.entry
	);

	React.useEffect(() => {
		getEntry({ id: entry.id }).then((fetchedEntry) => {
			setEntry(fetchedEntry!);
		});
	}, [entry.id]);

	const saveEntry = React.useCallback(
		(value: string) => {
			return editEntry({ id: props.entry.id, content: value }).then(
				(updatedEntry) => setEntry(updatedEntry!)
			);
		},
		[props.entry]
	);

	return (
		<>
			<div className="col-span-2 border-r border-black/10">
				<Editor initialValue={entry?.content} onSave={saveEntry} />
			</div>

			<div className="col-span-1">
				<AnalysisSummary analysis={entry.analysis} />
			</div>
		</>
	);
};

export default EditEntryForm;
