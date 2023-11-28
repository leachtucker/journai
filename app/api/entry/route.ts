import { getCurrentUser } from '@/utils/auth';
import prisma from '@/utils/db';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

type CreateEntryDTO = {
	content: string;
};

export const POST = async (request: NextRequest) => {
	const user = await getCurrentUser();
	const body = (await request.json()) as CreateEntryDTO;

	const entry = await prisma.journalEntry.create({
		data: {
			userId: user.id,
			content: body.content,
		},
	});

	// revalidates cache for pages with a list of entries
	revalidatePath('/journal');

	return NextResponse.json({ data: entry });
};
