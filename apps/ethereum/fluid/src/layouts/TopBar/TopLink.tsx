import Link from 'next/link';

interface TopLinkProps {
	href: string;
	text: string;
}

const TopLink = ({ href, text }: TopLinkProps) => (
	<Link href={href}>
		<a>
			<button type="button" className="font-bold text-gray-700 hover:text-gray-500">
				{text}
			</button>
		</a>
	</Link>
);

export default TopLink;
