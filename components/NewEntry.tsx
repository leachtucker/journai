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
			<div className="flex justify-center items-center h-full">
				<span className="text-xl">Create a New Entry</span>
			</div>
		</div>
	);
};

export default NewEntry;
