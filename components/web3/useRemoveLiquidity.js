import React, { useContext, useEffect, useRef, useState } from "react";
import { useEthers, useContractFunction } from "@usedapp/core";
import dexInfo from "../../constants/Dex.json";
import daiInfo from "../../constants/DAI.json";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { DexAddress, DaiTokenAddress } from "../../address";
import { DexContext } from "../useContext/context";

const Web3CreatePoolRemove = () => {
  const { liquidityRemoveStatus, setliquidityRemoveStatus, setLoading } =
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
    const { index } = input.poolInfo;
    const { liquidity } = input;

    removeLiquidity(index, liquidity, {
      value: liquidity,
    });
  };

  useEffect(() => {
    if (daiStatus.status === "Success") {
      removeLiquidityFunc();
    }

    if (daiStatus.status === "Mining") {
      setLoading(true);
    }
  }, [daiStatus]);

  useEffect(() => {
    if (removeLiquidityStatus.status === "Success") {
      const { index, address } = input.poolInfo;
      const { tokenPair } = input;

      console.log({ input });
      console.log({ tokenPair });
      console.log({ removeLiquidityStatus });
      console.log({ removeLiquidityEvents });

      console.log({
        removeliquidityAmount:
          removeLiquidityEvents[0]?.args?._amount.toString(),
      });

      // console.log({removeliquidityAmount : removeLiquidityEvents[0]?.args?._amount.toString()})

      setliquidityRemoveStatus({
        liquidityid: index,
        liquidityowner: removeLiquidityEvents[0]?.args?._from,
        amount: removeLiquidityEvents[0]?.args?._amount.toString(),
        token: daiAddress,
        // totalamount:
        //   parseInt(removeLiquidityEvents[0]?.args?._amount.toString()) +
        //   parseInt(removeLiquidityEvents[0]?.args?._lpTokenBalance.toString()),
        lpBalance: removeLiquidityEvents[0]?.args?._lpTokenSupply.toString(),
        ethBalance: removeLiquidityEvents[0]?.args?._ethBalance.toString(),
        tokenamount: removeLiquidityEvents[0]?.args?._lpTokenBalance.toString(),
        ethamount: removeLiquidityEvents[0]?.args?._amount.toString(),
        poolAddress: address,
        lpaddress: removeLiquidityEvents[0]?.args?._lpTokenAddress.toString(),
        tokenReserve: removeLiquidityEvents[0]?.args?._tokenReserve.toString(),
        tokenPair: tokenPair[0].Token,
      });
    }
  }, [removeLiquidityStatus]);

  const usePoolRemove = async (data) => {
    const { index, address } = data.poolInfo;
    const { liquidity, tokenPair } = data;
    console.log({ tokenPair });
    setInput(data);
    approveUser(address, liquidity);
  };
  return { usePoolRemove };
};
export default Web3CreatePoolRemove;
