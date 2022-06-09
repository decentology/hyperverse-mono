import { createContext, useContext } from 'react';

const context = createContext({
	value: 1,
});

export function IndexPage() {
	const localContext = useContext(context);
	return <div>Hello World</div>;
}
