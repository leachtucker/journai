import prisma from '@/utils/db';
import * as Ramda from 'ramda';

import { getCurrentUser } from '@/utils/auth';
import SentimentChart from '@/components/SentimentChart';

const Page = async () => {
	const { sentiments, avg } = await getSentimentScores();

	console.log({ sentiments });

	return (
		<div className="p-10">
			<h2 className="text-3xl mb-8">History</h2>

			<div className="w-full h-[500px]">
				<SentimentChart data={sentiments} />
			</div>
		</div>
	);
};

export default Page;

const getSentimentScores = async () => {
	const user = (await getCurrentUser())!;

	const sentiments = await prisma.analysis.findMany({
		where: {
			entry: {
				userId: user.id,
			},
		},
		select: {
			sentimentScore: true,
			createdAt: true,
			subject: true,
			color: true,
		},
		orderBy: {
			createdAt: 'asc',
		},
	});

	const scores = Ramda.map(Ramda.prop('sentimentScore'), sentiments);
	const avg = Ramda.sum(scores) / scores.length;

	return { sentiments, avg };
};
