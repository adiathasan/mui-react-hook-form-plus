import Link from 'next/link';

export default function Home() {
	return (
		<div>
			<Link prefetch={false} href='/mui'>
				MUI
			</Link>
		</div>
	);
}
