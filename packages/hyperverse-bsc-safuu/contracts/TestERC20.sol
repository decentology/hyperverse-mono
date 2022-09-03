// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestERC20 is ERC20 {

    constructor(
    ) ERC20("Test", "TEST") {
        _mint(msg.sender, 270000000000000000000);
    }

    function mint(address _to, uint256 _count) external{
        _mint(_to, _count);
    }
}
