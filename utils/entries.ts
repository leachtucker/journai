import prisma from './db';
import { getCurrentUser } from './auth';

export const getJournalEntriesForCurrentUser = async () => {
	const user = (await getCurrentUser())!;

	const entries = await prisma.journalEntry.findMany({
		where: {
			userId: user.id,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	return entries;
};
