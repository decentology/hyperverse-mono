// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "./hyperverse/CloneFactory.sol";
import "./hyperverse/IHyperverseModule.sol";
import "./Token.sol";

/**
  * @dev Clone Factory Implementation for ERC20 Token
 */

 contract TokenFactory is CloneFactory {
   struct Tenant {
     Token token;
     address owner;
   }

    mapping(address => Tenant) public tenants;

    address public masterContract;
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
    // TO DO: modifier for msg.sender and or a list of admins?

    function createInstance(address _tenant, string memory _name, string memory _symbol, uint256 _decimal) 
    isAllowedToCreateInstance(_tenant)
    external 
    {
      Token token =  Token(createClone(masterContract));

      //initializing tenant state of clone 
      token.init(_name, _symbol, _decimal, msg.sender);

      //set Tenant data
      Tenant storage newTenant = tenants[_tenant];
      newTenant.token = token;
      newTenant.owner = _tenant;

    }

    function getProxy(address _tenant) public view returns (Token) {
        return tenants[_tenant].token;
    }

    /******************* ERC20 FUNCTIONALITIES *******************/
    function totalSupply(address _tenant) external view returns (uint256) {
        return getProxy(_tenant).totalSupply();
    }


    function balance(address _tenant) public view returns (uint256) {
        return getProxy(_tenant).balance();
    }

    function balanceOf(address _tenant, address _owner) public view returns (uint256) {
        return getProxy(_tenant).balanceOf(_owner);
    }

    function transfer(address _tenant, address _to, uint256 _value) public returns (bool) {
        return getProxy(_tenant).transfer(_to, _value);
    }

    function transferFrom(address _tenant, address _from, address _to, uint256 _value) public returns (bool) {
        return getProxy(_tenant).transferFrom(_from, _to, _value);
    }

    function allowance(address _tenant, address _owner, address _spender) public view returns (uint256) {
        return getProxy(_tenant).allowance(_owner, _spender);
    }

    function approve(address _tenant, address _spender, uint256 _value) public returns (bool) {
        return getProxy(_tenant).approve(_spender, _value);
    }
    //Questionable? contractOwner will be the owner of the contract 
    // maybe a getInstanceOwner function?
    function getContractOwner(address _tenant) public view returns (address) {
        return getProxy(_tenant).getContractOwner();
    }


    function incrementCounter(address _tenant, uint256 _increment) public {
        getProxy(_tenant).incrementCounter(_increment);
    }

    function getCounter(address _tenant) public view returns (uint256) {
        return getProxy(_tenant).getCounter();
    }

 }