import { getEntryByIdForUser } from '@/utils/entries';
import EditEntryForm from './EditEntryForm';

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
			<EditEntryForm entry={entry} />
		</div>
	);
};

export default Page;
