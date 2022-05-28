import { styled } from '../../stitches.config';
import {Nav}  from '../components/Playground/Nav';

export default function Playground() {
	return (
		<>
			<Main>
    <Nav/>

			</Main>
		</>
	);
}

const Main = styled('main', {
	display: 'flex',

});

