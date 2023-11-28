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
		<div className="h-full w-full">
			<Editor entry={entry} />
		</div>
	);
};

export default Page;
