/**

## The Decentology Smart Module standard on Ethereum

## `IHyperverseModule` interface

In essense, this contract serves the equivalent of two purposes
in respect to Cadence:
1) Enforces the `metadata` variable (same as IHyperverseModule.cdc)
2) Defines what a ModuleMetadata is (sam as HyperverseModule.cdc)

*/

// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

abstract contract IHyperverseModule {
    ModuleMetadata public metadata;
    address private owner;

    struct ModuleMetadata {
        bytes title;
        address author;
        bytes version;
        uint256 publishedAt;
        bytes externalLink; 
    }
}
    
