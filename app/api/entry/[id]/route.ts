import { getCurrentUser } from '@/utils/auth';
import prisma from '@/utils/db';
import { JournalEntry } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

type EditEntryDto = Pick<JournalEntry, 'content'>;

export const PATCH = async (
	request: NextRequest,
	{ params }: { params: { id: string } }
) => {
	const user = await getCurrentUser();
	const body = (await request.json()) as EditEntryDto;

	const entry = await prisma.journalEntry.update({
		where: {
			id: params.id,
			userId: user.id,
		},
		data: {
			content: body.content,
		},
	});

	// revalidate cache for pages with journal entries
	revalidatePath('/journal');

	return NextResponse.json({ data: entry });
};
