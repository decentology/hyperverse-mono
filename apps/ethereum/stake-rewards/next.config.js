const withTM = require("next-transpile-modules")([
  "@decentology/hyperverse",
  "@decentology/hyperverse-ethereum",
  "@decentology/hyperverse-ethereum-stake-rewards",
]);

module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ["siasky.net", "fileportal.org"],
  },
});
