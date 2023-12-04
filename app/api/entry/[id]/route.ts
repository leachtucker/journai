import { analyzeEntry } from '@/utils/ai';
import { getCurrentUser } from '@/utils/auth';
import prisma from '@/utils/db';
import { Analysis, JournalEntry } from '@prisma/client';
import { revalidatePath, revalidateTag } from 'next/cache';
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
		include: {
			analysis: true,
		},
	});

	let analysis: Analysis | null = null;
	const isEntryLongEnoughForAnalysis = body.content.split(' ').length > 4;
	if (isEntryLongEnoughForAnalysis) {
		const newAnalysis = await analyzeEntry(body.content);
		analysis = await prisma.analysis.upsert({
			where: {
				entryId: params.id,
			},
			create: {
				entryId: params.id,
				...newAnalysis,
			},
			update: newAnalysis,
		});
	}

	// revalidate cache for pages with journal entries
	revalidatePath('/journal');
	revalidateTag(entry.id);

	return NextResponse.json({ data: { ...entry, analysis: analysis } });
};

export const GET = async (
	request: NextRequest,
	{ params }: { params: { id: string } }
) => {
	const user = await getCurrentUser();

	const entry = await prisma.journalEntry.findUnique({
		where: {
			id: params.id,
			userId: user.id,
		},
		include: {
			analysis: true,
		},
	});

	return NextResponse.json({ data: entry });
};
