import React, { useContext, useEffect, useRef, useState } from "react";
import {
  useEthers,
  useContractFunction,
  useContractCall,
  useCall,
} from "@usedapp/core";
import dexInfo from "../../constants/Dex.json";
import daiInfo from "../../constants/DAI.json";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { DexAddress, DaiTokenAddress } from "../../address";
import { DexContext } from "../useContext/context";
import { parseUnits } from "ethers/lib/utils";

const Web3SwapToken = () => {
  const { activePool, setToastNotifcation, loading, setLoading } =
    useContext(DexContext);
  const { account } = useEthers();
  const dexAddress = DexAddress;
  const daiAddress = DaiTokenAddress;
  const dexInterface = new ethers.utils.Interface(dexInfo.abi);
  const dexAddressContract = new Contract(dexAddress, dexInterface);
  const daiInterface = new ethers.utils.Interface(daiInfo.abi);
  const daiAddressContract = new Contract(daiAddress, daiInterface);
  const [input, setInput] = useState(false);

  const {
    state: swapToTokenStatus,
    send: dexSwapToToken,
    events: swapFromTokenEvents,
  } = useContractFunction(dexAddressContract, "_swapEthToToken");

  const {
    state: daiStatus,
    send: approveUser,
    events: daiEvents,
  } = useContractFunction(daiAddressContract, "approve");

  const SwapToToken = () => {
    const { amount, estimatedAmount } = input;
    console.log("inside useSwapToken function");

    console.log({ insideamount: amount });
    console.log({ insideestimatedAmount: estimatedAmount });

    console.log({ insideactivePool: activePool });

    dexSwapToToken(activePool, amount, estimatedAmount, {
      value: amount,
    });
  };

  useEffect(() => {
    if (daiStatus.status === "Success") {
      SwapToToken();
    }

    if (daiStatus.status === "Mining") {
      setLoading(true);
    }
  }, [daiStatus]);

  useEffect(() => {
    console.log({ swapToTokenStatus: swapToTokenStatus.status });

    if (swapToTokenStatus.status === "Success") {
      const { tokenPair, amount, estimatedAmount } = input;

      setToastNotifcation({
        type: "swapToken",
        swappedBy: account,
        tokenFrom: tokenPair.Token,
        tokenTo: "ETH",
        amount: amount,
        estimatedAmount: estimatedAmount,
        time: Date.now(),
      });
    }
  }, [swapToTokenStatus]);

  const useSwapToken = async (data) => {
    const { amount, estimatedAmount, pooladdress, tokenPair } = data;
    console.log("inside useSwapToken");
    console.log({ data });
    console.log({ amountWei: parseUnits(amount, 18).toString() });
    console.log({ amount });
    console.log({ estimatedAmount });

    console.log({ tokenPair });
    setInput(data);

    approveUser(pooladdress, amount);
  };
  return { useSwapToken };
};
export default Web3SwapToken;
