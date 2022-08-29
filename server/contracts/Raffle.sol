// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

error Raffle__Enough();

contract Raffle {
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

    function pickRandomWinner() public {}

    function getEntranceFee() public view returns (uint256) {
        return i_entranceFee;
    }

    function getPlayer(uint256 index) public view returns (address) {
        return s_players[index];
    }
}
