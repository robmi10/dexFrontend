import React, { useContext, useEffect, useRef, useState } from "react";
import { useEthers, useContractFunction } from "@usedapp/core";
import dexInfo from "../../constants/Dex.json";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { DexAddress, DaiTokenAddress } from "../../address";
import { DexContext } from "../useContext/context";

const Web3SwapToken = () => {
  const { setSetSwapStatus } = useContext(DexContext);
  const { account } = useEthers();
  const dexAddress = DexAddress;
  const dexInterface = new ethers.utils.Interface(dexInfo.abi);
  const dexAddressContract = new Contract(dexAddress, dexInterface);
  const [input, setInput] = useState(false);
  const {
    state: swapToTokenStatus,
    send: dexSwapToToken,
    events: swapFromTokenEvents,
  } = useContractFunction(dexAddressContract, "_swapEthToToken");

  useEffect(() => {
    console.log({ swapToTokenStatus: swapToTokenStatus.status });

    if (swapToTokenStatus.status === "Success") {
      const amount = input;
      console.log({ swapFromTokenEvents });

      setSetSwapStatus({
        amount: amount,
        from: account,
      });
    }
  }, [swapToTokenStatus]);

  const useSwapToken = async (amount) => {
    console.log("inside useSwapToken");
    console.log({ amount });
    setInput(amount);
    dexSwapToToken(amount, account);
  };
  return { useSwapToken };
};
export default Web3SwapToken;
