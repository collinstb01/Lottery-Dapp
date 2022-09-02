import React, { useEffect, useState } from "react";
import { useWeb3Contract } from "react-moralis";
import { abi, contractAddresses } from "../constants";
import { useMoralis } from "react-moralis";
import { useNotification } from "web3uikit";

const LotteryEnrance = () => {
  const [entranceFee, setEntranceFee] = useState("0");
  const [numPlayers, setNumPlayers] = useState("");
  const [recentWinner, setRecentWinner] = useState("");
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chainIdHex); // 0x4 <------- mEANS the hex chainId version
  const raffleAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  const dispatch = useNotification();

  const {
    runContractFunction: enterRaffle,
    isFetching,
    isLoading,
  } = useWeb3Contract({
    abi: abi,
    functionName: "enterRaffle",
    contractAddress: raffleAddress,
    msgValue: entranceFee,
    params: {},
  });

  const { runContractFunction: getInterval } = useWeb3Contract({
    abi: abi,
    functionName: "getInterval",
    contractAddress: raffleAddress,
    msgValue: "",
    params: {},
  });

  const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
    abi: abi,
    functionName: "getNumberOfPlayers",
    contractAddress: raffleAddress,
    msgValue: "",
    params: {},
  });

  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi: abi,
    functionName: "getRecentWinner",
    contractAddress: raffleAddress,
    msgValue: "",
    params: {},
  });

  async function UpdateUi() {
    const EntranceFee = (await getInterval()).toString();
    const numPlayerFromCall = (await getNumberOfPlayers()).toString();
    const recentWinnerfromcall = (await getRecentWinner()).toString();
    setEntranceFee(EntranceFee);
    setNumPlayers(numPlayerFromCall);
    setRecentWinner(recentWinnerfromcall);
  }
  useEffect(() => {
    if (isWeb3Enabled) {
      UpdateUi();
    }
  }, [isWeb3Enabled]);

  const enter = async () => {
    await enterRaffle({
      onSuccess: handleSucess,
      onError: () => console.log(error),
    });
  };

  const handleSucess = async (tx) => {
    await tx.wait(1);
    handleNotfication(tx);
    UpdateUi();
  };

  const handleNotfication = () => {
    dispatch({
      type: "info",
      message: "Transaction Complete",
      title: "Transaction Notification",
      position: "topR",
      icon: "bell",
    });
  };
  return (
    <div>
      {raffleAddress ? (
        <div>
          <button onClick={enter} disabled={isFetching || isLoading}>
            {isFetching || isLoading ? "Loading..." : "Enter Raffle"}
          </button>
          <p>{entranceFee}</p>
          <p>Number Of players: {numPlayers}</p>
          <p>Recent Winner: {recentWinner}</p>
        </div>
      ) : (
        <p>No raffleAddress detected</p>
      )}
    </div>
  );
};

export default LotteryEnrance;
