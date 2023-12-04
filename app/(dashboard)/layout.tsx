import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

type LayoutProps = { children: React.ReactNode };
const Layout = ({ children }: LayoutProps) => {
	return (
		<div className="w-screen h-screen relative">
			<aside className="absolute w-[200px] top-0 left-0 h-full border-r border-black/10">
				<nav>
					<Link href="/">
						<div className="h-[60px] flex justify-center items-center bg-black">
							<h2 className="text-2xl font-semibold text-white">
								Journ<span className="text-indigo-500 font-bold">AI</span>
							</h2>
						</div>
					</Link>

					<ul>
						{links.map((link) => (
							<li
								key={link.href}
								className="py-3 flex justify-center border-b border-black/10"
							>
								<Link href={link.href}>
									<span className="text-md font-semibold ">{link.label}</span>
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</aside>

			<div className="ml-[200px] h-full">
				<header className="h-[60px] border-b border-black/10">
					<div className="h-full w-full px-6 flex items-center justify-end">
						<UserButton />
					</div>
				</header>

				<div className="h-[calc(100vh-60px)]">{children}</div>
			</div>
		</div>
	);
};

export default Layout;

const links = [{ href: '/journal', label: 'Journal' }];
