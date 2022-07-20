import { createContainer, useContainer } from '@decentology/unstated-next';
import { useEvm } from '@decentology/hyperverse-evm/react';

function PolygonState() {
	const state = useEvm();
	return {
		...state,
	};
}

export const Polygon = createContainer(PolygonState);
export const Provider = Polygon.Provider;
export function usePolygon() {
	return useContainer(Polygon);
}
