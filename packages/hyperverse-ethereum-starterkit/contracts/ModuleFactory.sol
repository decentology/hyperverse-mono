// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "./hyperverse/CloneFactory.sol";
import "./hyperverse/IHyperverseModule.sol";
import "./Module.sol";

/**
  * @dev Clone Factory Implementation for ERC20 Token
 */

 contract TokenFactory is CloneFactory {
   struct Tenant {
     Module module;
     address owner;
   }

    mapping(address => Tenant) public tenants;

    address public immutable masterContract;
    address private hyperverseAdmin = 0xD847C7408c48b6b6720CCa75eB30a93acbF5163D;


    modifier isOwner(address _tenant) {
        require(
            tenants[_tenant].owner == msg.sender,
            "The calling address is not an owner of a tenant"
        );
        _;
    }

    modifier isAllowedToCreateInstance(address _tenant) {
        require(
            msg.sender == _tenant || msg.sender == hyperverseAdmin,
            "Please use a valid address to create an instance"
        );
        _;
    }

    constructor(address _masterContract) {
        masterContract = _masterContract;
    }

    /******************* TENANT FUNCTIONALITIES *******************/

    function createInstance(address _tenant) 
    isAllowedToCreateInstance(_tenant)
    external 
    {
      Module m =  Module(createClone(masterContract));

      //initializing tenant state of clone 
      m.init( msg.sender);

      //set Tenant data
      Tenant storage newTenant = tenants[_tenant];
      newTenant.module = m;
      newTenant.owner = _tenant;

    }

    function getProxy(address _tenant) public view returns (Module) {
        return tenants[_tenant].module;
    }

 }
