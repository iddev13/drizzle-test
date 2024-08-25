import Link from 'next/link';

export const Header = () => {
	return (
		<header className="border-b border-slate-950 p-4">
			<div className="flex items-center max-w-5xl mx-auto">
				<div className="flex-1">
					<Link href="/" title="LOGO">
						LOGO
					</Link>
				</div>
				<nav>
					<ul>
						<li>
							<Link href="/notes">Notes</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};
