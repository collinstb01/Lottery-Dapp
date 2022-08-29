// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

error Raffle__Enough();

contract Raffle is VRFConsumerBaseV2 {
    uint256 private immutable i_entranceFee;

    address payable[] private s_players;

    constructor(uint256 entranceFee) {
        i_entranceFee = entranceFee;
    }

    event Raffleenter(address indexed player);

    function enterRaffle() public payable {
        // check if the money sent is enough
        if (msg.value < i_entranceFee) {
            revert Raffle__Enough();
        }
        s_players.push(payable(msg.sender));
        // emit event
        emit Raffleenter(msg.sender);
    }

    function requestRandomNumber() external {}

    function fufillRandomNumber(uint256 requestId, unit256[] memory randomWords) internal virtual {}

    function pickRandomWinner() public {}

    function getEntranceFee() public view returns (uint256) {
        return i_entranceFee;
    }

    function getPlayer(uint256 index) public view returns (address) {
        return s_players[index];
    }
}
