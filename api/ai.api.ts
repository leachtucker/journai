import { getURLForPath } from '@/utils/common';

export const getAnswer = async ({ question }: { question: string }) => {
	const url = getURLForPath(`/api/ai/ask?question=${question}`);

	const res = await fetch(new Request(url), {
		method: 'GET',
	});

	return (await res.json()).data as string;
};
