const fcl = require('@onflow/fcl');
const t = require('@onflow/types');

async function getRandomPick(values: any[]) {
    try {
        console.log(values);
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
