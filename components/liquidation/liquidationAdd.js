import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Web3CreatePoolAdd from "../web3/useaddliquidity";
import { DexContext } from "../useContext/context";
import { formatEther, parseUnits } from "ethers/lib/utils";
import Web3GetLiquidityAmount from "../web3/useGetLiquidityAmount";

export const LiquidationAdd = () => {
  const {
    poolList,
    activePool,
    setActivePool,
    liquidityStatus,
    setliquidityStatus,
  } = useContext(DexContext);
  const { register, handleSubmit } = useForm();
  const { usePoolAdd } = Web3CreatePoolAdd();

  useEffect(() => {}, [poolList, activePool]);

  if (!poolList) return false;

  const filterPoolList = poolList.map((option, i) => ({
    index: i,
    address: option.PoolAddress,
  }));

  const isPoolist = filterPoolList.length > 0;

  // filtrera så du kan få värdet

  const updateValue = ({ target }) => {
    setActivePool(parseInt(target.value));
  };

  if (!activePool && activePool !== 0) return false;
  const poolListTokenValue = poolList.filter(
    (option) => option.PoolId === activePool
  );

  if (!poolListTokenValue) return false;

  return (
    <div className="bg-purple-800 w-3/4 p-4 text-white flex flex-col items-center gap-20">
      {isPoolist && (
        <>
          <h1>Add Liquidity</h1>
          <div className=" flex flex-row gap-4">
            <span>
              <h1>LP Token Balance</h1>
              <h1>{formatEther(poolListTokenValue[0]?.TokenAmount || 0)}</h1>
            </span>
            <span>
              <h1>Eth Balance</h1>
              <h1>{formatEther(poolListTokenValue[0]?.EthAmount || 0)}</h1>
            </span>
          </div>

          <section>
            <label>Pool</label>
            <select
              onChange={updateValue}
              className="w-full text-black p-2 rounded-md border flex justify-center"
            >
              {filterPoolList.map((option, i) => {
                return (
                  <>
                    <option key={i} value={option.index}>
                      {option.index}
                    </option>
                    ;
                  </>
                );
              })}
            </select>
          </section>
        </>
      )}
      <div className="space-y-5 flex items-center flex-col">
        <Web3GetLiquidityAmount poolInfo={filterPoolList[activePool]} />
      </div>
    </div>
  );
};
