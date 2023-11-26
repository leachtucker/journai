import { JournalEntry } from '@prisma/client';

type EntryProps = { entry: JournalEntry };

const Entry = ({ entry }: EntryProps) => {
	return <div>{entry.id}</div>;
};

export default Entry;
