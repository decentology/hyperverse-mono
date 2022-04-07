const fcl = require('@onflow/fcl');
const t = require('@onflow/types');

async function sayHello(tenant: string) {
    try {
        const hello = await fcl.send([
            fcl.script`
            import HelloWorld from 0xHelloWorld
                
            pub fun main(tenant: Address): String? {
                return HelloWorld.sayHello(tenant)
            }
            `,
            fcl.args([
                fcl.arg(tenant, t.String)
            ]),
        ]).then(fcl.decode);

        return hello;
    } catch (error) {
        console.error(error);
    }
}

export { sayHello };
