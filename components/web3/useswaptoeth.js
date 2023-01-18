import React, { useContext, useEffect, useRef, useState } from "react";
import { useEthers, useContractFunction } from "@usedapp/core";
import dexInfo from "../../constants/Dex.json";
import daiInfo from "../../constants/DAI.json";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { DexAddress, DaiTokenAddress } from "../../address";
import { DexContext } from "../useContext/context";
import { formatUnits, parseUnits } from "ethers/lib/utils";

const Web3SwapEth = () => {
  const { activePool, setToastNotifcation } = useContext(DexContext);
  const { account } = useEthers();
  const dexAddress = DexAddress;
  const daiAddress = DaiTokenAddress;
  const dexInterface = new ethers.utils.Interface(dexInfo.abi);
  const dexAddressContract = new Contract(dexAddress, dexInterface);
  const daiInterface = new ethers.utils.Interface(daiInfo.abi);
  const daiAddressContract = new Contract(daiAddress, daiInterface);
  const [input, setInput] = useState(false);

  const {
    state: daiStatus,
    send: approveUser,
    events: daiEvents,
  } = useContractFunction(daiAddressContract, "approve");

  const {
    state: swapToEthStatus,
    send: dexSwapToEth,
    events: swapToEthEvents,
  } = useContractFunction(dexAddressContract, "_swapTokenToEth");

  const SwapToEth = () => {
    const { amount, estimatedAmount, pooladdress } = input;
    console.log("inside useSwapToken function");

    console.log({ insideamount: amount });
    console.log({ insideestimatedAmount: estimatedAmount });
    console.log({ insideactivePool: activePool });

    dexSwapToEth(activePool, amount, estimatedAmount, account, {
      value: amount,
    });
  };

  useEffect(() => {
    if (daiStatus.status === "Success") {
      SwapToEth();
    }
  }, [daiStatus]);

  useEffect(() => {
    console.log({ swapToEthStatus: swapToEthStatus.status });

    if (swapToEthStatus.status === "Success") {
      const { tokenPair, amount, estimatedAmount } = input;

      setToastNotifcation({
        type: "swapEth",
        swappedBy: account,
        tokenFrom: "ETH",
        tokenTo: tokenPair.Token,
        amount: amount,
        estimatedAmount: estimatedAmount,
        time: Date.now(),
      });
    }

    if (swapToEthStatus.status === "Error") {
      console.log("Error !!");
    }
  }, [swapToEthStatus]);

  const useSwapEth = async (data) => {
    const { amount, estimatedAmount, pooladdress } = data;
    console.log("inside useSwapEth");
    console.log({ data });
    console.log({ amountWei: amount });
    console.log({ estimatedAmount });
    console.log({
      estimatedAmount: parseUnits(estimatedAmount, 18).toString(),
    });
    setInput(data);

    console.log({ pooladdress });

    approveUser(pooladdress, estimatedAmount);
  };
  return { useSwapEth };
};
export default Web3SwapEth;
