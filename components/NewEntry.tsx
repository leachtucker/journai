'use client';

import { useRouter } from 'next/navigation';

import { createEntry } from '@/api/entries.api';

const NewEntry = () => {
	const router = useRouter();

	const handleClick = async () => {
		const entry = await createEntry({ content: 'New entry...' });
		if (!entry) return;

		router.push(`/journal/${entry.id}`);
	};

	return (
		<div
			className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md"
			onClick={handleClick}
		>
			<div className="px-4 py-5 sm:p-6">
				<span className="text-xl">New Entry</span>
			</div>
		</div>
	);
};

export default NewEntry;
