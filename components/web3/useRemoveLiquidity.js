import React, { useContext, useEffect, useRef, useState } from "react";
import { useEthers, useContractFunction } from "@usedapp/core";
import dexInfo from "../../constants/Dex.json";
import daiInfo from "../../constants/DAI.json";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { DexAddress, DaiTokenAddress } from "../../address";
import { DexContext } from "../useContext/context";

const Web3CreatePoolRemove = () => {
  const { liquidityRemoveStatus, setliquidityRemoveStatus } =
    useContext(DexContext);
  const { account } = useEthers();
  const daiAddress = DaiTokenAddress;
  const dexAddress = DexAddress;
  const dexInterface = new ethers.utils.Interface(dexInfo.abi);
  const dexAddressContract = new Contract(dexAddress, dexInterface);
  const daiInterface = new ethers.utils.Interface(daiInfo.abi);
  const daiAddressContract = new Contract(daiAddress, daiInterface);
  const [input, setInput] = useState(false);

  const {
    state: removeLiquidityStatus,
    send: removeLiquidity,
    events: removeLiquidityEvents,
  } = useContractFunction(dexAddressContract, "_removeLiquidity");

  const {
    state: daiStatus,
    send: approveUser,
    events: daiEvents,
  } = useContractFunction(daiAddressContract, "approve");

  const removeLiquidityFunc = () => {
    const { liquidityPool, liquidityRemove } = input;
    console.log({ inputCheck: input });
    console.log({ liquidityRemove });
    removeLiquidity(parseInt(liquidityPool), liquidityRemove, {
      value: liquidityRemove,
    });
  };

  useEffect(() => {
    console.log({ daiStatus: removeLiquidityStatus });
    if (daiStatus.status === "Success") {
      console.log({ daiStatus });
      removeLiquidityFunc();
    }
  }, [daiStatus]);

  useEffect(() => {
    const { liquidityPool, liquidityRemove } = input;
    console.log({ removeLiquidityStatus: removeLiquidityStatus });
    if (removeLiquidityStatus.status === "Success") {
      console.log({ removeLiquidityStatus });
      console.log({ removeLiquidityEvents: removeLiquidityEvents[0] });

      console.log({
        LPamount: removeLiquidityEvents[0]?.args?._amount.toString(),
      });

      console.log({
        LpTokenBalance:
          removeLiquidityEvents[0]?.args?._lpTokenBalance.toString(),
      });

      setliquidityRemoveStatus({
        liquidityid: liquidityPool,
        liquidityowner: removeLiquidityEvents[0]?.args?._from,
        amount: parseInt(
          removeLiquidityEvents[0]?.args?._lpTokenBalance.toString() -
            removeLiquidityEvents[0]?.args?._amount.toString()
        ),
        token: daiAddress,
      });
    }
  }, [removeLiquidityStatus]);

  const usePoolRemove = async (data) => {
    console.log({ data });
    const { liquidityPool, liquidityRemove } = data;
    setInput(data);
    console.log({ dexAddress });
    approveUser("0x57aD6B95508a96dfC6e17efD702360B5124f4680", liquidityRemove);
  };
  return { usePoolRemove };
};
export default Web3CreatePoolRemove;
