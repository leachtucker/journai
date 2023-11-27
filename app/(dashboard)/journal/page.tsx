import { getJournalEntriesForCurrentUser } from '@/utils/entries';
import Entry from '@/components/Entry';
import NewEntry from '@/components/NewEntry';

const Page = async () => {
	const journalEntries = await getJournalEntriesForCurrentUser();
	console.log({ journalEntries });

	return (
		<div className="p-10">
			<h2 className="text-3xl mb-8">Journal</h2>

			<div className="grid grid-cols-3 gap-4">
				<NewEntry />

				{journalEntries.map((entry) => (
					<Entry key={entry.id} entry={entry} />
				))}
			</div>
		</div>
	);
};

export default Page;
