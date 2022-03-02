/**
## The Decentology Smart Module standard on Ethereum
## `IHyperverseModule` interface
*/

// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

abstract contract IHyperverseModule {
	ModuleMetadata public metadata;
	address private owner;

	struct ModuleMetadata {
		bytes title;
		Author author;
		bytes version;
		uint64 publishedAt;
		bytes externalLink;
	}

	struct Author {
		address authorAddress;
		string externalLink;
	}
}
