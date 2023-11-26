import { getJournalEntriesForCurrentUser } from '@/utils/entries';

const Page = async () => {
	const journalEntries = await getJournalEntriesForCurrentUser();
	console.log({ journalEntries });

	return <div></div>;
};

export default Page;
