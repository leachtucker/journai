import { getCurrentUser } from '@/utils/auth';
import prisma from '@/utils/db';
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

	return NextResponse.json({ data: entry });
};
