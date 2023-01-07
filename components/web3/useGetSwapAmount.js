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
const Web3GetSwapAmount = ({
  activePool,
  tokenFirst,
  switchPair,
  pooladdress,
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
    <div className="w-full flex flex-col justify-center items-center">
      {etherBalance && daiBalance && (
        <>
          <h1>Pool Eth Balance</h1>
          <h1>{formatEther(etherBalance.toString())}</h1>
          <h1>Pool DAI Balance</h1>
          <h1>{formatEther(daiBalance.toString())}</h1>
        </>
      )}
      <input
        onChange={() => {
          setTokenSecond(e.target.value);
          handleToken(e.target.value);
        }}
        value={
          switchPair && swapToEth?.value?.toString()
            ? formatEther(swapToEth?.value?.toString())
            : !switchPair && swapToDai?.value?.toString()
            ? formatEther(swapToDai?.value?.toString())
            : 0
        }
        className="h-10 flex items-center p-4 border-2 border-green-500 hover:bg-green-500 rounded-full text-black"
      />

      {isExchangeNotAccepted && (
        <p className="text-red-500 text-xs ">
          Error To Little Amount For Swapping
        </p>
      )}
      <button
        disabled={isExchangeNotAccepted}
        onClick={onSubmitAdd}
        className="w-2/4 justify-center mt-8 h-10 flex items-center p-4 border-2 border-green-500 hover:bg-green-500 rounded-full"
      >
        SUBMIT
      </button>
    </div>
  );
};

export default Web3GetSwapAmount;
