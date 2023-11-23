import Link from 'next/link';

export default function Home() {
	return (
		<div className="w-screen h-screen bg-black flex justify-center items-center text-white">
			<div className="w-full max-w-[800px]">
				<h1 className="text-6xl mb-4">Your AI-Powered Personal Journal</h1>
				<p className="text-2xl text-white/60 mb-8">
					This is the best app for tracking your mood through out your life.
					<br /> All you have to do is be honest.
				</p>

				<div className="flex justify-center">
					<Link href="/journal">
						<button className="bg-blue-600 px-4 py-2 rounded-lg text-xl">
							Get Started
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
