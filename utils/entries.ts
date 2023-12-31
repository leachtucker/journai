import prisma from './db';
import { getCurrentUser } from './auth';
import { Prisma } from '@prisma/client';

export const getJournalEntriesForCurrentUser = async () => {
	const user = (await getCurrentUser())!;

	const entries = await prisma.journalEntry.findMany({
		where: {
			userId: user.id,
		},
		orderBy: {
			createdAt: 'desc',
		},
		include: {
			analysis: true,
		},
	});

	return entries;
};

export const getEntryByIdForUser = async (id: string) => {
	const user = await getCurrentUser();
	const entry = await prisma.journalEntry.findUnique({
		where: {
			id,
		},
		include: {
			analysis: true,
		},
	});

	if (!entry) return null;
	if (entry?.userId != user.id) {
		throw new Error(
			`Entry does not belong to the current user. User ID: ${user.id}`
		);
	}

	return entry;
};

export type JournalEntryWithAnalysis = Prisma.JournalEntryGetPayload<{
	include: { analysis: true };
}>;
