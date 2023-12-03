import Editor from '@/components/Editor';
import { getEntryByIdForUser } from '@/utils/entries';
import AnalysisSummary from './AnalysisSummary';

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
				{entry.analysis && <AnalysisSummary analysis={entry.analysis} />}
			</div>
		</div>
	);
};

export default Page;
