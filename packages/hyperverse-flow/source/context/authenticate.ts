const fcl = require('@onflow/fcl');
const authenticate = async () => {
	await fcl.logIn();
};

export default authenticate;
