// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";

error Raffle__Enough();

contract Raffle is VRFConsumerBaseV2 {
    uint256 private immutable i_entranceFee;

    address payable[] private s_players;
    VRFCoordinatorV2Interface private immutable i_vrfCoorrdinate;
    bytes32 private immutable i_gasLane;
    uint64 private immutable i_subcriptionid;
    uint16 private constant REQUEST_CONFIRMATIONS = 3;
    uint32 private immutable i_callbackGasLimit;
    uint32 private immutable i_numWords;

    constructor(
        address vrfCoordinatorV2,
        uint256 entranceFee,
        bytes32 gasLane,
        uint64 subscriptionId,
        uint32 numWords,
        uint32 callbackGasLimit
    ) VRFConsumerBaseV2(vrfCoordinatorV2) {
        i_entranceFee = entranceFee;
        i_vrfCoorrdinate = VRFCoordinatorV2Interface(vrfCoordinatorV2);
        i_gasLane = gasLane;
        i_subcriptionid = subscriptionId;
        i_callbackGasLimit = callbackGasLimit;
        i_numWords = numWords;
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

    function requestRandomNumber() external {
        i_vrfCoorrdinate.requestRandomWords(
            i_gasLane,
            i_subcriptionid,
            REQUEST_CONFIRMATIONS,
            i_callbackGasLimit,
            i_numWords
        );
    }

    function fulfillRandomWords(
        uint256, /* requestId */
        uint256[] memory randomWords
    ) internal override {}

    function pickRandomWinner() public {}

    function getEntranceFee() public view returns (uint256) {
        return i_entranceFee;
    }

    function getPlayer(uint256 index) public view returns (address) {
        return s_players[index];
    }
}
