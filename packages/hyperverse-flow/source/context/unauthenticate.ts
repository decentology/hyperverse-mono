const fcl = require("@onflow/fcl");
const unauthenticate = async () => {
  await fcl.unauthenticate();
};

export default unauthenticate;
