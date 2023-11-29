import { JournalEntry } from '@prisma/client';
import { getURLForPath } from '@/utils/common';

export const createEntry = async ({ content }: { content: string }) => {
	const url = getURLForPath('/api/entry');

	const res = await fetch(new Request(url), {
		method: 'POST',
		body: JSON.stringify({
			content,
		}),
	});

	if (!res.ok) {
		return null;
	}

	return (await res.json()).data as JournalEntry;
};

export const editEntry = async ({
	id,
	content,
}: {
	content: string;
	id: string;
}) => {
	const url = getURLForPath(`/api/entry/${id}`);

	const res = await fetch(new Request(url), {
		method: 'PATCH',
		body: JSON.stringify({
			content,
		}),
	});

	if (!res.ok) {
		return null;
	}

	return (await res.json()).data as JournalEntry;
};
