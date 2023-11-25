import { auth } from '@clerk/nextjs';
import Link from 'next/link';

export default async function Home() {
	const { userId } = await auth();

	const ctaHref = !userId ? '/new-user' : '/journal';
	return (
		<div className="w-screen h-screen bg-black flex justify-center items-center text-white">
			<div className="w-full max-w-[800px]">
				<h1 className="text-6xl mb-4">Your AI-Powered Journal</h1>
				<p className="text-2xl text-white/60 mb-8">
					The best app for tracking your mood through out your life.
					<br /> All you have to do is be honest.
				</p>

				<div>
					<Link href={ctaHref}>
						<button className="bg-indigo-500 px-4 py-2 rounded-lg text-xl">
							Get Started
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
