var $f09Zi$decentologyhyperverse = require("@decentology/hyperverse");
var $f09Zi$react = require("react");
var $f09Zi$decentologyunstatednext = require("@decentology/unstated-next");
var $f09Zi$onflowfcl = require("@onflow/fcl");
var $f09Zi$reactjsxruntime = require("react/jsx-runtime");

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function(key) {
    if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function get() {
        return source[key];
      }
    });
  });

  return dest;
}

$parcel$export(module.exports, "useToken", () => $67c4d5c234d2ea60$export$31dcd79391e423fe);
$parcel$export(module.exports, "Provider", () => $2ce8d7ff9e725ddd$export$2881499e37b75b9a);




function $67c4d5c234d2ea60$var$TokenState(initialState = {
    tenantId: ''
}) {
    const [isInitialized, setInitialized] = $f09Zi$react.useState(false);
    let { network: network  } = $f09Zi$decentologyhyperverse.useHyperverse();
    const tenantId = initialState.tenantId;
    const initialize = async ()=>{
        if (network.type === $f09Zi$decentologyhyperverse.Network.Mainnet) ;
        else if (network.type === $f09Zi$decentologyhyperverse.Network.Testnet) $f09Zi$onflowfcl.config().put('0xToken', 'FILL THIS IN');
        const TokenAddress = await $f09Zi$onflowfcl.config().get('0xToken');
        if (typeof TokenAddress !== 'undefined') setInitialized(true);
        else setInitialized(false);
    };
    $f09Zi$react.useEffect(()=>{
        initialize();
    }, []);
    return {
        isInitialized: isInitialized
    };
}
const $67c4d5c234d2ea60$export$442a589dca201a22 = $f09Zi$decentologyunstatednext.createContainer($67c4d5c234d2ea60$var$TokenState);
const $67c4d5c234d2ea60$export$2881499e37b75b9a = $67c4d5c234d2ea60$export$442a589dca201a22.Provider;
function $67c4d5c234d2ea60$export$31dcd79391e423fe() {
    return $67c4d5c234d2ea60$export$442a589dca201a22.useContainer();
}




const $2ce8d7ff9e725ddd$export$2881499e37b75b9a = ({ children: children , tenantId: tenantId  })=>{
    if (!tenantId) throw new Error('Tenant ID is required');
    return /*#__PURE__*/ $f09Zi$reactjsxruntime.jsx($67c4d5c234d2ea60$export$2881499e37b75b9a, {
        initialState: {
            tenantId: tenantId
        },
        children: children
    });
};


var $0b2838a4dd37da13$exports = {};


$parcel$exportWildcard(module.exports, $0b2838a4dd37da13$exports);


//# sourceMappingURL=index.js.map
