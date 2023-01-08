import {
  useCall,
  useEtherBalance,
  useEthers,
  useTokenBalance,
} from "@usedapp/core";
import { Contract, ethers } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import React, { useContext, useState, useEffect } from "react";
import { BsArrowDownUp } from "react-icons/bs";
import { DaiTokenAddress, DexAddress } from "../../address";
import dexInfo from "../../constants/Dex.json";
import { DexContext } from "../useContext/context";
import { formatEther } from "ethers/lib/utils";
import Web3SwapToken from "./useswaptotoken";
import Web3SwapEth from "./useswaptoeth";
import eth from "../svg/eth.svg";
import Image from "next/image";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const Web3GetSwapAmount = ({
  activePool,
  tokenFirst,
  switchPair,
  pooladdress,
  tokenPair,
  ethPair,
}) => {
  const { setCalculateEthToDai, setCalculateDaiToEth } = useContext(DexContext);
  const { account } = useEthers();
  const amount = tokenFirst;
  const currentPool = activePool;
  const dexInterface = new ethers.utils.Interface(dexInfo.abi);
  const dexAddressContract = new Contract(DexAddress, dexInterface);
  const [isExchangeNotAccepted, setIsExchangeNotAccepted] = useState("");
  const { useSwapToken } = Web3SwapToken();
  const { useSwapEth } = Web3SwapEth();
  const etherBalance = useEtherBalance(pooladdress);
  const daiBalance = useTokenBalance(DaiTokenAddress, pooladdress);

  const swapToEth = useCall(
    DexAddress &&
      amount && {
        contract: dexAddressContract,
        method: "_getSwapAmount",
        args: [currentPool, parseUnits(amount, 18)],
      }
  );
  // console.log({ swapToEth: swapToEth?.value?.toString() });
  setCalculateDaiToEth(swapToEth?.value?.toString());

  const swapToDai = useCall(
    DexAddress &&
      amount && {
        contract: dexAddressContract,
        method: "_getSwapAmountEth",
        args: [currentPool, parseUnits(amount, 18)],
      }
  );
  // console.log({ swapToDai: swapToDai?.value?.toString() });

  const swapToDaiSecond = useCall(
    DexAddress &&
      amount && {
        contract: dexAddressContract,
        method: "_getAmount",
        args: [currentPool, parseUnits(amount, 18)],
      }
  );
  // console.log({
  //   swapToDaiSecond: swapToDaiSecond?.value?.toString(),
  // });
  setCalculateEthToDai(swapToDai?.value?.toString());

  useEffect(() => {
    handleToken();
  }, [swapToDai, swapToEth, amount]);

  const onSubmitAdd = () => {
    console.log({ activePool });
    console.log({ amount });

    console.log({ switchPair });

    console.log("swapToDai ->", swapToDai?.value?.toString());
    console.log("swapToEth ->", swapToEth?.value?.toString());

    !switchPair
      ? useSwapToken({
          amount: parseUnits(amount, 18).toString(),
          estimatedAmount: swapToDai?.value?.toString(),
          pooladdress: pooladdress,
        })
      : useSwapEth({
          amount: parseUnits(amount, 18).toString(),
          estimatedAmount: swapToEth?.value?.toString(),
          pooladdress: pooladdress,
        });
  };

  const handleToken = (_amount) => {
    let currentToken =
      switchPair && swapToEth?.value?.toString()
        ? formatEther(swapToEth?.value?.toString())
        : !switchPair && swapToDai?.value?.toString()
        ? formatEther(swapToDai?.value?.toString())
        : 0;

    console.log({ swapToEth: swapToEth?.value?.toString() });
    console.log({ swapToDai: swapToDai?.value?.toString() });
    console.log({
      swapToDaiSecond: swapToDaiSecond?.value?.toString(),
    });

    console.log({ amount: parseFloat(amount) });
    console.log({ currentToken: parseFloat(currentToken) });

    if (parseFloat(currentToken) >= parseFloat(amount)) {
      setIsExchangeNotAccepted(false);

      console.log("To big amount ");
    } else {
      setIsExchangeNotAccepted(true);
      console.log("To small amount ");
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center ">
      {/* {etherBalance && daiBalance && (
        <>
          <h1>Pool Eth Balance</h1>
          <h1>{formatEther(etherBalance.toString())}</h1>
          <h1>Pool DAI Balance</h1>
          <h1>{formatEther(daiBalance.toString())}</h1>
        </>
      )} */}
      <div className="h-24 flex w-full relative z-0">
        <input
          onChange={() => {
            setTokenSecond(e.target.value);
            handleToken(e.target.value);
          }}
          value={
            switchPair && swapToEth?.value?.toString()
              ? parseFloat(formatEther(swapToEth?.value?.toString())).toFixed(2)
              : !switchPair && swapToDai?.value?.toString()
              ? parseFloat(formatEther(swapToDai?.value?.toString())).toFixed(2)
              : 0
          }
          className="h-24 flex w-full bg-slate-800 items-center p-4 text-white rounded-2xl text-4xl"
        />
        <button className="absolute right-2 bg-white text-xl text-gray-500 rounded-full top-1/4 w-4/12 h-2/4 flex flex-row justify-center items-center gap-3">
          <Image src={eth} className=" w-12 h-8" alt="btc" />

          <h1 className=" font-bold text-2xl">
            {switchPair ? tokenPair?.toUpperCase() : ethPair?.toUpperCase()}
          </h1>
          <MdOutlineKeyboardArrowDown size={30} />
        </button>
      </div>

      <div className="h-6">
        {isExchangeNotAccepted && (
          <p className=" text-red-500 text-xs mt-1">
            Error To Little Amount For Swapping
          </p>
        )}
      </div>
      <button
        disabled={isExchangeNotAccepted}
        onClick={onSubmitAdd}
        className="w-2/4 justify-center mt-2 h-16 flex items-center border-2 bg-indigo-900 hover:text-indigo-900 hover:bg-white hover:cursor-pointer rounded-full"
      >
        SWAP
      </button>
    </div>
  );
};

export default Web3GetSwapAmount;
