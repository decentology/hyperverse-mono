# Random Pick

<p> The `getRandomPick` function from `Flow Random Pick` returns a random value from an initial set of values. </p>

---

<br>

### getRandomPick

<p> The `getRandomPick` function takes in an array of values. </p>

```jsx

const fcl = require('@onflow/fcl');
const t = require('@onflow/types');

async function getRandomPick(values: any[]) {
    try {
        const randomPick = await fcl.send([
            fcl.script`
            import RandomPick from 0xRandomPick
                
            pub fun main(values: [AnyStruct]): AnyStruct {
                return RandomPick.randomPick(values: values)
            }
            `,
            fcl.args([
                fcl.arg(values, t.Array(t.Int))
            ]),
        ]).then(fcl.decode);

        console.log(randomPick);
        return randomPick;
    } catch (error) {
        console.error(error);
    }
}

export { getRandomPick };

```

### Stories

```jsx

import { RandomPick } from './randomPick';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/randomPick.mdx';

export default {
	title: 'Components/RandomPick',
	component: RandomPick,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<RandomPick {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
};

```

### Main UI Component

```jsx

import { useRandomPick } from '../source';
import { useState, useEffect } from 'react';
import './style.css';

export const RandomPick = ({ ...props }: {values: string[]}) => {
	const randomPick = useRandomPick();
	const [data, setData] = useState([]);

	useEffect(() => {
		if (randomPick.getRandomPick) {
			randomPick.getRandomPick(props.values).then(setData);
		}
	}, [randomPick.getRandomPick]);

	return (
		<div className="body">
			Random Pick: <b>{data}</b>
		</div>
	);
};

```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
