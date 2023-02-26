import { useContext, useEffect, useState } from "react";
import { useEthers, useContractFunction } from "@usedapp/core";
import dexInfo from "../../constants/Dex.json";
import daiInfo from "../../constants/DAI.json";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { DexAddress, DaiTokenAddress } from "../../address";
import { DexContext } from "../useContext/context";

const Web3SwapToken = () => {
  const { setToastNotifcation, setLoading } = useContext(DexContext);
  const { account } = useEthers();
  const dexAddress = DexAddress;
  const daiAddress = DaiTokenAddress;
  const dexInterface = new ethers.utils.Interface(dexInfo.abi);
  const dexAddressContract = new Contract(dexAddress, dexInterface);
  const daiInterface = new ethers.utils.Interface(daiInfo.abi);
  const daiAddressContract = new Contract(daiAddress, daiInterface);
  const [input, setInput] = useState(false);

  const { state: swapToTokenStatus, send: dexSwapToToken } =
    useContractFunction(dexAddressContract, "_swapEthToToken");

  const { state: daiStatus, send: approveUser } = useContractFunction(
    daiAddressContract,
    "approve"
  );

  const SwapToToken = () => {
    const { amount, estimatedAmount, tokenPair } = input;
    dexSwapToToken(tokenPair.PoolId, estimatedAmount, {
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

  const SwapToken = async (data) => {
    const { estimatedAmount, pooladdress } = data;
    setInput(data);

    approveUser(pooladdress, estimatedAmount);
  };
  return { SwapToken };
};
export default Web3SwapToken;
