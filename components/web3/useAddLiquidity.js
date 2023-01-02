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
    const { index, address } = input.poolInfo;
    const { liquidity } = input;

    console.log({ indexSecond: index });
    console.log({ addressSecond: address });
    console.log({ liquiditySecond: liquidity });

    addLiquidity(index, liquidity, {
      value: liquidity,
    });
  };

  useEffect(() => {
    console.log({ daiStatus: addLiquidityStatus });
    if (daiStatus.status === "Success") {
      console.log({ daiStatus });
      console.log({ daiEvents });
      addLiquidityFunc();
    }
  }, [daiStatus]);

  useEffect(() => {
    console.log({ addLiquidityStatus: addLiquidityStatus });

    if (addLiquidityStatus.status === "Success") {
      const { index } = input.poolInfo;
      console.log({ addLiquidityStatus });
      console.log({ addLiquidityEvents });
      console.log({
        EventMintedamount:
          addLiquidityEvents[0]?.args?._mintedAmount.toString(),
      });
      console.log({
        LPamount: addLiquidityEvents[0]?.args?._amount.toString(),
      });

      console.log({
        LpTokenBalance: addLiquidityEvents[0]?.args?._lpTokenBalance.toString(),
      });

      console.log({
        _ethReserve: addLiquidityEvents[0]?.args?._ethBalance.toString(),
      });

      setliquidityStatus({
        liquidityid: index,
        liquidityowner: addLiquidityEvents[0]?.args?._from,
        amount: addLiquidityEvents[0]?.args?._amount.toString(),
        token: daiAddress,
        totalamount:
          parseInt(addLiquidityEvents[0]?.args?._amount.toString()) +
          parseInt(addLiquidityEvents[0]?.args?._lpTokenBalance.toString()),
        lpBalance: addLiquidityEvents[0]?.args?._lpTokenSupply.toString(),
        ethBalance: addLiquidityEvents[0]?.args?._ethBalance.toString(),
        tokenamount: addLiquidityEvents[0]?.args?._amount.toString(),
        ethamount: addLiquidityEvents[0]?.args?._amount.toString(),
      });
    }
  }, [addLiquidityStatus]);

  const usePoolAdd = async (data) => {
    console.log({ data });
    const { liquidityPool, liquidityAdd } = data;
    const { index, address } = data.poolInfo;
    const { liquidity } = data;
    setInput(data);
    // console.log({ dexAddress });

    console.log({ liquidity });
    console.log({ index });
    // addLiquidity(2, liquidityAdd, {
    //   value: ethers.utils.parseEther("2"),
    // });
    approveUser(address, liquidity);
  };
  return { usePoolAdd };
};
export default Web3CreatePoolAdd;
