import prisma from '@/utils/db';
import * as Ramda from 'ramda';

import { getCurrentUser } from '@/utils/auth';
import SentimentChart from '@/components/SentimentChart';

const Page = async () => {
	const { sentiments, avg } = await getSentimentScores();

	const hasSentiments = sentiments && sentiments.length > 0;
	return (
		<div className="p-10">
			<h2 className="text-3xl mb-8">History</h2>

			<div className="w-full h-[500px] rounded-md shadow-md ">
				<div className="grid grid-cols-7 h-full">
					<div className="col-span-1">
						<div className="w-full p-2 py-4 border-b flex justify-around items-center">
							<span className="text-lg ">Avg. Mood:</span>
							<span>{avg}</span>
						</div>
					</div>

					<div className="h-full col-span-6 border-l">
						{hasSentiments ? (
							<SentimentChart data={sentiments} />
						) : (
							<NoDataChartPlaceholder />
						)}
					</div>
				</div>
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
	const avg = scores.length > 0 ? Ramda.sum(scores) / scores.length : null;

	return { sentiments, avg };
};

const NoDataChartPlaceholder = () => {
	return (
		<div className="h-full w-full bg-slate-200 flex items-center justify-center">
			<span className="text-center animate-pulse">
				A trend of your mood can be found here once you&apos;ve made some
				entries in your journal
			</span>
		</div>
	);
};
