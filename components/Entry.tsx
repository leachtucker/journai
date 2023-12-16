import { Analysis, JournalEntry } from '@prisma/client';

type EntryWithAnalysis = JournalEntry & { analysis?: Analysis | null };

type EntryProps = { entry: EntryWithAnalysis };

const Entry = ({ entry }: EntryProps) => {
	const date = new Date(entry.createdAt).toDateString();

	const attributes = [
		{ subject: 'Subject', value: entry.analysis?.subject },
		{ subject: 'Mood', value: entry.analysis?.sentiment },
	];

	return (
		<div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-md">
			<div className="px-4 py-5 flex justify-between items-center">
				<span className="capitalize">{date}</span>
				<div
					className="p-[6px] rounded-[50%]"
					style={{ backgroundColor: entry.analysis?.color }}
				/>
			</div>

			{attributes.map((attr) => (
				<Attribute key={attr.subject} {...attr} />
			))}
		</div>
	);
};

export default Entry;

const Attribute = ({ subject, value }: { subject: string; value?: string }) => {
	let valueEl;
	if (value != null) {
		valueEl = <span className="capitalize">{value}</span>;
	} else {
		valueEl = (
			<span className="text-sm animate-pulse">Not yet analyzed...</span>
		);
	}

	return (
		<div className="px-4 py-5">
			{subject}: {valueEl}
		</div>
	);
};
