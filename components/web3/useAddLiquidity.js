import React, { useContext, useEffect, useRef, useState } from "react";
import { useEthers, useContractFunction } from "@usedapp/core";
import dexInfo from "../../constants/Dex.json";
import daiInfo from "../../constants/DAI.json";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { DexAddress, DaiTokenAddress } from "../../address";
import { DexContext } from "../useContext/context";

const Web3CreatePoolAdd = () => {
  const { liquidityStatus, setliquidityStatus } = useContext(DexContext);
  const { account } = useEthers();
  const daiAddress = DaiTokenAddress;
  const dexAddress = DexAddress;
  const dexInterface = new ethers.utils.Interface(dexInfo.abi);
  const dexAddressContract = new Contract(dexAddress, dexInterface);
  const daiInterface = new ethers.utils.Interface(daiInfo.abi);
  const daiAddressContract = new Contract(daiAddress, daiInterface);
  const [input, setInput] = useState(false);

  const {
    state: addLiquidityStatus,
    send: addLiquidity,
    events: addLiquidityEvents,
  } = useContractFunction(dexAddressContract, "_addLiquidity");

  const {
    state: daiStatus,
    send: approveUser,
    events: daiEvents,
  } = useContractFunction(daiAddressContract, "approve");

  const addLiquidityFunc = () => {
    console.log({ inputCheck: input });
    const { liquidityPool, liquidityAdd } = input;
    addLiquidity(0, liquidityAdd, {
      value: ethers.utils.parseEther("1"),
    });
  };

  useEffect(() => {
    console.log({ daiStatus: addLiquidityStatus });
    if (daiStatus.status === "Success") {
      console.log({ daiStatus });
      addLiquidityFunc();
    }
  }, [daiStatus]);

  useEffect(() => {
    console.log({ addLiquidityStatus: addLiquidityStatus });
    if (addLiquidityStatus.status === "Success") {
      console.log({ addLiquidityStatus });
      console.log({ addLiquidityEvents: addLiquidityEvents[0] });

      setliquidityStatus({
        liquidityid: addLiquidityEvents[0]?.args?._amount.toString(),
        liquidityowner: addLiquidityEvents[0]?.args?._from,
        amount: addLiquidityEvents[0]?.args?._mintedAmount.toString(),
        token: daiAddress,
      });
    }
  }, [addLiquidityStatus]);

  const usePoolAdd = async (data) => {
    console.log({ data });
    const { liquidityPool, liquidityAdd } = data;
    setInput(data);
    console.log({ dexAddress });
    approveUser("0x6F1216D1BFe15c98520CA1434FC1d9D57AC95321", liquidityAdd);
  };
  return { usePoolAdd };
};
export default Web3CreatePoolAdd;
