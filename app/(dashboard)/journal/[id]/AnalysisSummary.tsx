import { Analysis } from '@prisma/client';

import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

type AnalysisSummaryProps = {
	analysis: Analysis;
};

const AnalysisSummary = ({ analysis }: AnalysisSummaryProps) => {
	const analysisInfo = [
		{ name: 'Subject', value: analysis.subject },
		{ name: 'Summary', value: analysis.summary },
		{ name: 'Mood', value: analysis.sentiment },
		{
			name: 'Negative',
			value: !analysis.negative ? <FaThumbsUp /> : <FaThumbsDown />,
		},
	];

	return (
		<>
			<div
				className="px-6 py-10 border-b border-black/10 shadow-md"
				style={{ backgroundColor: analysis?.color }}
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
		</>
	);
};

export default AnalysisSummary;
