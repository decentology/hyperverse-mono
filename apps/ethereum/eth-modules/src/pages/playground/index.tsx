import { styled } from '../../../stitches.config';
import { Nav } from '../../components/Playground/Nav';
import { ModuleCard } from '../../components/Modules/ModuleCard';
import { Modules } from '../../components/Modules';
import { ERC721 } from '../../components/icons';

export default function Playground() {
	return (
		<>
			<main>
				<Nav />
				<Modules/>
			</main>
		</>
	);
}
