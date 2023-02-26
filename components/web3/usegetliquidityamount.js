import { useCall } from "@usedapp/core";
import { Contract, ethers } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import React, { useContext, useState, useEffect } from "react";
import { DexAddress } from "../../address";
import dexInfo from "../../constants/Dex.json";
import SquareLoader from "../animation/square/square";
import { DexContext } from "../useContext/context";

import Web3CreatePoolAdd from "./useaddliquidity";
import Web3CreatePoolRemove from "./useremoveliquidity";

const Web3GetLiquidityAmount = ({ remove, poolInfo, tokenPair }) => {
  const { PoolAdd } = Web3CreatePoolAdd();
  const { PoolRemove } = Web3CreatePoolRemove();
  const { activePool, loading } = useContext(DexContext);

  const dexInterface = new ethers.utils.Interface(dexInfo.abi);
  const dexAddressContract = new Contract(DexAddress, dexInterface);
  const [isExchangeNotAccepted] = useState("");
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

  const onSubmitAdd = () => {
    PoolAdd({
      tokenPair: tokenPair,
      poolInfo: poolInfo,
      liquidity: parseUnits(amount, 18).toString(),
    });
  };

  const onSubmitRemove = () => {
    PoolRemove({
      tokenPair: tokenPair,
      poolInfo: poolInfo,
      liquidity: parseUnits(amount, 18).toString(),
    });
  };

  return (
    <div className="w-full mt-4 md:mt-0 flex h-full flex-col md:gap-2 justify-center items-center">
      <label className="mb-2 md:mb-0 w-full">Deposit Amount</label>
      <div className="h-24 flex w-full relative justify-center items-center">
        <input
          placeholder="ETH"
          className="bg-slate-800 w-48 md:w-full h-16 items-center p-4 text-white rounded-2xl text-4xl"
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
        className="md:w-full justify-center md:mt-2 h-16 md:h-2/6 w-48 p-1 flex items-center border-2 bg-slate-900 hover:cursor-pointer hover:duration-300 hover:text-indigo-900 hover:bg-white rounded-full"
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
