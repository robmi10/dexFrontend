import { useContext, useEffect, useState } from "react";
import { useEthers, useContractFunction } from "@usedapp/core";
import dexInfo from "../../constants/Dex.json";
import daiInfo from "../../constants/DAI.json";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { DexAddress, DaiTokenAddress } from "../../address";
import { DexContext } from "../useContext/context";

const Web3SwapEth = () => {
  const { activePool, setToastNotifcation, setLoading } =
    useContext(DexContext);
  const { account } = useEthers();
  const dexAddress = DexAddress;
  const daiAddress = DaiTokenAddress;
  const dexInterface = new ethers.utils.Interface(dexInfo.abi);
  const dexAddressContract = new Contract(dexAddress, dexInterface);
  const daiInterface = new ethers.utils.Interface(daiInfo.abi);
  const daiAddressContract = new Contract(daiAddress, daiInterface);
  const [input, setInput] = useState(false);

  const { state: daiStatus, send: approveUser } = useContractFunction(
    daiAddressContract,
    "approve"
  );

  const { state: swapToEthStatus, send: dexSwapToEth } = useContractFunction(
    dexAddressContract,
    "_swapTokenToEth"
  );

  const SwapToEth = () => {
    const { amount, estimatedAmount } = input;

    dexSwapToEth(activePool, estimatedAmount, account, {
      value: amount,
    });
  };

  useEffect(() => {
    if (daiStatus.status === "Success") {
      SwapToEth();
    }

    if (daiStatus.status === "Mining") {
      setLoading(true);
    }
  }, [daiStatus]);

  useEffect(() => {
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
  }, [swapToEthStatus]);

  const SwapEth = async (data) => {
    const { estimatedAmount, pooladdress } = data;
    setInput(data);

    approveUser(pooladdress, estimatedAmount);
  };
  return { SwapEth };
};
export default Web3SwapEth;
