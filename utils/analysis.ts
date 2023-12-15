import prisma from './db';
import { getCurrentUser } from './auth';

export const getAnalysesForUser = async () => {
	const user = (await getCurrentUser())!;

	const analyses = await prisma.analysis.findMany({
		where: {
			entry: {
				userId: user.id,
			},
		},
	});

	return analyses;
};
