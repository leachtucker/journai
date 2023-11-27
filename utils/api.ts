import { JournalEntry } from '@prisma/client';

const getURLForPath = (path: string) => {
	return `${window.location.origin}${path}`;
};

export const createEntry = async ({ content }: { content: string }) => {
	const url = getURLForPath('/api/entry');

	const res = await fetch(new Request(url), {
		method: 'POST',
		body: JSON.stringify({
			content: content,
		}),
	});

	if (!res.ok) {
		return null;
	}

	return (await res.json()).data as JournalEntry;
};
