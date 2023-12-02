import Editor from '@/components/Editor';
import { getEntryByIdForUser } from '@/utils/entries';

import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

type PageProps = { params: { id: string } };

const Page = async ({ params }: PageProps) => {
	const entry = await getEntryByIdForUser(params.id);
	const entryAnalysis = entry?.analysis;

	const analysisInfo = [
		{ name: 'Subject', value: entryAnalysis?.subject },
		{ name: 'Summary', value: entryAnalysis?.summary },
		{ name: 'Mood', value: entryAnalysis?.sentiment },
		{
			name: 'Negative',
			value: !entryAnalysis?.negative ? <FaThumbsUp /> : <FaThumbsDown />,
		},
	];

	if (!entry) {
		return (
			<div>
				<span>An error occurred fetching this journal entry...</span>
			</div>
		);
	}

	return (
		<div className="h-full w-full grid grid-cols-3">
			<div className="col-span-2 border-r border-black/10">
				<Editor entry={entry} />
			</div>

			<div className="col-span-1">
				<div
					className="px-6 py-10 border-b border-black/10"
					style={{ backgroundColor: entryAnalysis?.color }}
				>
					<h2 className="text-xl">Analysis</h2>
				</div>

				<div>
					<ul>
						{analysisInfo.map((item) => (
							<li
								key={item.name}
								className="flex items-center justify-between px-2 py-4 border-b border-black/10"
							>
								<span className="text-lg">{item.name}</span>
								<span className="max-w-[200px] text-right text-ellipsis overflow-hidden">
									{item.value}
								</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Page;
