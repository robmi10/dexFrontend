import {
  useCall,
  useEtherBalance,
  useEthers,
  useTokenBalance,
} from "@usedapp/core";
import { Contract, ethers } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import React, { useContext, useState, useEffect } from "react";
import { DexAddress } from "../../address";
import dexInfo from "../../constants/Dex.json";
import SquareLoader from "../animation/square/square";
import { DexContext } from "../useContext/context";

import Web3CreatePoolAdd from "./useaddliquidity";
import Web3CreatePoolRemove from "./useremoveliquidity";

const Web3GetLiquidityAmount = ({ _amount, remove, poolInfo, tokenPair }) => {
  const { usePoolAdd } = Web3CreatePoolAdd();
  const { usePoolRemove } = Web3CreatePoolRemove();
  const {
    setCalculateEthToDai,
    setCalculateDaiToEth,
    activePool,
    setModal,
    loading,
  } = useContext(DexContext);
  const { account } = useEthers();

  const dexInterface = new ethers.utils.Interface(dexInfo.abi);
  const dexAddressContract = new Contract(DexAddress, dexInterface);
  const [isExchangeNotAccepted, setIsExchangeNotAccepted] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {}, [loading]);

  const getLiquidityAmount = useCall(
    DexAddress &&
      amount && {
        contract: dexAddressContract,
        method: "_getLiquidityStatus",
        args: [activePool, parseUnits(amount, 18)],
      }
  );
  console.log({ getLiquidityAmount: getLiquidityAmount?.value?.toString() });
  // setCalculateDaiToEth(swapToEth?.value?.toString());

  const onSubmitAdd = (data) => {
    console.log({ liquidityAdd: parseUnits(amount, 18).toString() });

    console.log({ poolInfo });

    console.log({ tokenPair });

    usePoolAdd({
      tokenPair: tokenPair,
      poolInfo: poolInfo,
      liquidity: parseUnits(amount, 18).toString(),
    });
  };

  const onSubmitRemove = (data) => {
    console.log("onsubmit remove");
    console.log({ liquidityAdd: parseUnits(amount, 18).toString() });

    console.log({ poolInfo });
    console.log({ tokenPair });

    usePoolRemove({
      tokenPair: tokenPair,
      poolInfo: poolInfo,
      liquidity: parseUnits(amount, 18).toString(),
    });
  };

  return (
    <div className="w-full flex h-full flex-col gap-2 justify-center items-center">
      <label className="w-full">Deposit Amount</label>
      <div className="h-24 flex w-full relative">
        <input
          placeholder="ETH"
          className="bg-slate-800 w-full items-center p-4 text-white rounded-2xl text-4xl"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
      </div>
      <button
        disabled={isExchangeNotAccepted}
        onClick={() => {
          remove ? onSubmitRemove() : onSubmitAdd();
        }}
        className="w-full justify-center mt-2 h-2/6 flex items-center border-2 bg-slate-900 hover:cursor-pointer hover:duration-300 hover:text-indigo-900 hover:bg-white rounded-full"
      >
        {remove && !loading && <h1>Remove Liquidation</h1>}
        {!remove && !loading && <h1>Add Liquidation</h1>}
        {loading && <SquareLoader />}
      </button>
      {isExchangeNotAccepted && (
        <p className="text-red-500 text-xs ">Error To Not Accepted Liquidity</p>
      )}
    </div>
  );
};

export default Web3GetLiquidityAmount;
