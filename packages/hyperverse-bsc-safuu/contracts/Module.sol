// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "./utils/SafeMath.sol";
import "./hyperverse/IHyperverseModule.sol";
import "./hyperverse/Initializable.sol";

contract Module is IHyperverseModule, Initializable {
    using SafeMath for uint256;

    /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ S T A T E @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

    // Account used to deploy contract
    address public immutable contractOwner;

    //stores the tenant owner
    address private _tenantOwner;

    ///+state

    /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ E V E N T S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

    ///+events

    /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ E R R O R S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
    error Unauthorized();
    error AlreadyInitialized();
    error ZeroAddress();
    error SameAddress();

    /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ M O D I F I E R S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

    ///+modifiers
    modifier isTenantOwner() {
        if (msg.sender != _tenantOwner) {
            revert Unauthorized();
        }
        _;
    }

    modifier canInitialize(address _tenant) {
        if (_tenantOwner != address(0)) {
            revert AlreadyInitialized();
        }
        _;
    }

    modifier addressCheck(address _from, address _to) {
        if (_from == _to) {
            revert SameAddress();
        }
        if (_to == address(0) || _from == address(0)) {
            revert ZeroAddress();
        }
        _;
    }

    /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ C O N S T R U C T O R @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

    /**
     * @dev Make sure to update the information in the metadata before you deploy
     */
    constructor(address _owner) {
        metadata = ModuleMetadata(
            "Module Name",
            _owner,
            "0.0.1",
            block.timestamp,
            "https://externalLink.net"
        );
        contractOwner = _owner;
    }

    /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ F U N C T I O N S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

    /**
     * @dev Initializes the instance of a tenant for this contract and sets the state variables
     *
     * @param _tenant The address of the instance owner
     */
    function initialize(address _tenant)
        external
        initializer
        canInitialize(_tenant)
    {
        _tenantOwner = _tenant;
    }

    ///+functions
}
