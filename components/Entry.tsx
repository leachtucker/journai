import { Analysis, JournalEntry } from '@prisma/client';

type EntryWithAnalysis = JournalEntry & { analysis?: Analysis | null };

type EntryProps = { entry: EntryWithAnalysis };

const Entry = ({ entry }: EntryProps) => {
	const date = new Date(entry.createdAt).toDateString();

	return (
		<div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-md">
			<div className="px-4 py-5">{date}</div>
			<div className="px-4 py-5">Summary: {entry.analysis?.summary}</div>
			<div className="px-4 py-5">Mood: {entry.analysis?.sentiment}</div>
		</div>
	);
};

export default Entry;
