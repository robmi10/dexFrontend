import React, { useEffect, useState, useContext } from "react";
import { useEthers } from "@usedapp/core";
import { useForm } from "react-hook-form";
import Web3CreatePoolRemove from "../web3/useremoveliquidity";
import { DexContext } from "../useContext/context";
import { formatEther } from "ethers/lib/utils";

export const LiquidationRemove = () => {
  const { poolList, activePool, setActivePool } = useContext(DexContext);
  const { register, handleSubmit } = useForm();
  const { usePoolRemove } = Web3CreatePoolRemove();
  useEffect(() => {}, [poolList, activePool]);

  if (!poolList) return false;

  const filterPoolList = poolList.map((option, i) => ({
    index: i,
    address: option.PoolAddress,
  }));

  const isPoolist = filterPoolList.length > 0;

  const onSubmitRemove = (data) => {
    usePoolRemove({
      poolInfo: filterPoolList[activePool],
      liquidity: data.liquidityRemove,
    });
  };

  const updateValue = ({ target }) => {
    setActivePool(parseInt(target.value));
  };

  if (!activePool && activePool !== 0) return false;
  const poolListTokenValue = poolList.filter(
    (option) => option.PoolId === activePool
  );
  return (
    <div className="bg-yellow-600 w-3/4 p-4 text-white flex flex-col items-center gap-20">
      {isPoolist && (
        <>
          <h1>Remove Liquidity</h1>
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
      <form
        onSubmit={handleSubmit(onSubmitRemove)}
        className="space-y-5 flex items-center flex-col"
      >
        <label>Amount</label>
        <input
          className="h-10 flex items-center p-4 border-2 border-green-500 hover:bg-green-500 rounded-full text-black"
          {...register("liquidityRemove", { required: true, maxLength: 40 })}
        />
        <button
          type="submit"
          className="h-10 flex items-center p-4 border-2 border-green-500 hover:bg-green-500 rounded-full"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};
