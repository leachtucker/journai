import { NextRequest, NextResponse } from 'next/server';

import { askQuestionAgainstEntries } from '@/utils/ai/question-answers';
import { getCurrentUser } from '@/utils/auth';
import prisma from '@/utils/db';

export const GET = async (request: NextRequest) => {
	const user = await getCurrentUser();
	const entriesForUser = await prisma.journalEntry.findMany({
		where: {
			userId: user.id,
		},
		select: {
			id: true,
			createdAt: true,
			content: true,
		},
	});

	const question = request.nextUrl.searchParams.get('question');
	if (!question) {
		return NextResponse.json(
			{ message: 'Missing question query parameter.' },
			{ status: 400 }
		);
	}

	const answer = await askQuestionAgainstEntries(question, entriesForUser);

	return NextResponse.json({ data: answer });
};
