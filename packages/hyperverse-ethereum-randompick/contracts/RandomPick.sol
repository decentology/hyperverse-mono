// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

/**
 * Request testnet LINK and ETH here: https://faucets.chain.link/
 * Find information on LINK Token Contracts and get the latest ETH and LINK faucets here: https://docs.chain.link/docs/link-token-contracts/
 */
contract RandomPick is VRFConsumerBase {
    bytes32 internal keyHash;
    uint256 internal fee;
    // Where you can access your results
    // requestId => result
    mapping(bytes32 => int256) public results;
    /* Helpers along the way */
    // requestId => input
    mapping(bytes32 => int256[]) public randomList;
    // requestId => tenant address
    mapping(bytes32 => address) public requestIdToAddress;
    event StartedRandomPick(address tenant, bytes32 requestId);

    /**
     * Constructor inherits VRFConsumerBase
     * All of this info is gotten from: https://docs.chain.link/docs/vrf-contracts/
     *
     * Network: Rinkeby
     * Chainlink VRF Coordinator address: 0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B
     * LINK token address:                0x01BE23585060835E02B77ef475b0Cc51aA1e0709
     * Key Hash: 0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311
     * Fee: 0.1 LINK
     */
    constructor(address vrfCoordinator, address linkToken, bytes32 key)
        VRFConsumerBase(
            vrfCoordinator, // VRF Coordinator
            linkToken // LINK Token on Rinkeby
        )
    {
        keyHash = key;
        fee = 0.1 * 10**18; // 0.1 LINK (Varies by network)
    }

    /**
     * Requests randomness
     * Everything set in here is done on the first transaction
     */
    function startRandomPick(int256[] memory numbers) public returns (bytes32) {
        require(
            LINK.balanceOf(address(this)) >= fee,
            "Not enough LINK - fill contract with faucet"
        );
        bytes32 requestId = requestRandomness(keyHash, fee);
        randomList[requestId] = numbers;
        requestIdToAddress[requestId] = msg.sender;
        emit StartedRandomPick(msg.sender, requestId);
        return requestId;
    }

    /**
     * Callback function used by VRF Coordinator
     * Everything set in here is done on the second transaction
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness)
        internal
        override
    {
        uint256 length = randomList[requestId].length;
        uint256 index = randomness % length;
        results[requestId] = randomList[requestId][index];
    }
}
