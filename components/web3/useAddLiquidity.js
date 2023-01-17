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
    const { index, address } = input.poolInfo;
    const { liquidity } = input;
    addLiquidity(index, liquidity, {
      value: liquidity,
    });
  };

  useEffect(() => {
    if (daiStatus.status === "Success") {
      addLiquidityFunc();
    }
  }, [daiStatus]);

  useEffect(() => {
    console.log({ addLiquidityStatus });

    if (addLiquidityStatus.status === "Success") {
      const { index, address } = input.poolInfo;

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

      console.log({
        _lpTokenBalance:
          addLiquidityEvents[0]?.args?._lpTokenBalance.toString(),
      });

      console.log({
        _lpTokenAddress:
          addLiquidityEvents[0]?.args?._lpTokenAddress.toString(),
      });

      console.log({
        _tokenReserve: addLiquidityEvents[0]?.args?._tokenReserve.toString(),
      });

      setliquidityStatus({
        liquidityid: index,
        liquidityowner: addLiquidityEvents[0]?.args?._from,
        amount: addLiquidityEvents[0]?.args?._amount.toString(),
        token: daiAddress,
        lpBalance: addLiquidityEvents[0]?.args?._lpTokenSupply.toString(),
        ethBalance: addLiquidityEvents[0]?.args?._ethBalance.toString(),
        tokenamount: addLiquidityEvents[0]?.args?._lpTokenBalance.toString(),
        ethamount: addLiquidityEvents[0]?.args?._amount.toString(),
        poolAddress: address,
        lpaddress: addLiquidityEvents[0]?.args?._lpTokenAddress.toString(),
        tokenReserve: addLiquidityEvents[0]?.args?._tokenReserve.toString(),
      });
    }
  }, [addLiquidityStatus]);

  const usePoolAdd = async (data) => {
    const { address } = data.poolInfo;
    const { liquidity } = data;
    setInput(data);
    approveUser(address, liquidity);
  };
  return { usePoolAdd };
};
export default Web3CreatePoolAdd;
