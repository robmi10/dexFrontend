import React, { useContext, useEffect, useRef, useState } from "react";
import { useEthers, useContractFunction } from "@usedapp/core";
import dexInfo from "../../constants/Dex.json";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { DexAddress, DaiTokenAddress } from "../../address";
import { DexContext } from "../useContext/context";

const Web3SwapEth = () => {
  const { setSetSwapStatus } = useContext(DexContext);
  const { account } = useEthers();
  const dexAddress = DexAddress;
  const dexInterface = new ethers.utils.Interface(dexInfo.abi);
  const dexAddressContract = new Contract(dexAddress, dexInterface);
  const [input, setInput] = useState(false);
  const {
    state: swapToEthStatus,
    send: dexSwapToEth,
    events: swapToEthEvents,
  } = useContractFunction(dexAddressContract, "_swapTokenToEth");

  useEffect(() => {
    console.log({ swapToEthStatus: swapToEthStatus.status });

    if (swapToEthStatus.status === "Success") {
      const { amount, estimatedAmount } = input;
      console.log({ swapToEthEvents });
      console.log({ swapToEthStatus });

      setSetSwapStatus({
        amount: amount,
        estimatedAmount: estimatedAmount,
        from: account,
      });
    }
  }, [swapToEthStatus]);

  const useSwapEth = async ({ data }) => {
    const { amount, estimatedAmount } = data;
    console.log("inside useSwapEth");
    console.log({ data });
    setInput(data);

    dexSwapToEth(amount, estimatedAmount, account);
  };
  return { useSwapEth };
};
export default Web3SwapEth;
