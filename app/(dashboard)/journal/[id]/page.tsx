import Editor from '@/components/Editor';
import { getEntryByIdForUser } from '@/utils/entries';

type PageProps = { params: { id: string } };

const Page = async ({ params }: PageProps) => {
	const entry = await getEntryByIdForUser(params.id);

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
				<div className="bg-blue-300 px-6 py-10">
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
								<span>{item.value}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Page;

const analysisInfo = [
	{ name: 'Subject', value: '' },
	{ name: 'Summary', value: '' },
	{ name: 'Mood', value: '' },
	{ name: 'Negative', value: '' },
];
