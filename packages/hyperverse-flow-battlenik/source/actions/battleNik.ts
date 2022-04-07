const fcl = require('@onflow/fcl');
const t = require('@onflow/types');

async function battleNik(yourGuess: number) {
    try {
        const hello = await fcl.send([
            fcl.script`
            import BattleNik from 0xBattleNik
                
            pub fun main(yourGuess: Int): Bool {
                return BattleNik.battle(yourGuess: yourGuess)
            }
            `,
            fcl.args([
                fcl.arg(yourGuess, t.Int)
            ]),
        ]).then(fcl.decode);

        return hello;
    } catch (error) {
        console.error(error);
    }
}

export { battleNik };
