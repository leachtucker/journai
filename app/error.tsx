'use client';

import NextError from 'next/error';

type ErrorProps = {
	error: NextError & { digest?: string };
	reset: () => void;
};

const Error = ({ error, reset }: ErrorProps) => {
	return (
		<div className="w-screen h-screen bg-black text-white flex justify-center items-center flex-col">
			<h2 className="text-5xl">Oops!</h2>
			<p className="text-xl text-white/60 mt-2">Something went wrong...</p>

			<div className="mt-8">
				<button
					onClick={reset}
					className="bg-indigo-500 px-4 py-2 rounded-lg text-lg animate-bounce"
				>
					Try Again
				</button>
			</div>
		</div>
	);
};

export default Error;
