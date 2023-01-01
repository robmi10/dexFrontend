import React, { useContext, useEffect, useState } from "react";
import { useEthers } from "@usedapp/core";
import { useForm, Controller } from "react-hook-form";
import Web3CreatePoolAdd from "../web3/useaddliquidity";
import Web3Approve from "../web3/useapprove";
import { DexContext } from "../useContext/context";
import Select from "react-select";

export const LiquidationAdd = () => {
  const { poolList } = useContext(DexContext);
  const { register, handleSubmit } = useForm();
  const { usePoolAdd } = Web3CreatePoolAdd();

  useEffect(() => {}, [poolList]);

  if (!poolList) return false;

  const filterPoolList = poolList.map((option, i) => ({
    index: i,
    address: option.Token,
  }));

  const isPoolist = filterPoolList.length > 0;

  const onSubmitAdd = (data) => {
    usePoolAdd({
      poolInfo: filterPoolList[data.liquidityAddress],
      liquidity: data.liquidityAdd,
    });
  };

  console.log({ filterPoolList });
  console.log({ poolListSecond: poolList });
  return (
    <div className="bg-purple-800 w-3/4 p-4 text-white flex flex-col items-center gap-20">
      <h1>Add Liquidity</h1>

      {isPoolist && (
        <section>
          <label>Pool</label>
          <select
            className="w-full text-black p-2 rounded-md border flex justify-center"
            {...register("liquidityAddress", { required: true, maxLength: 40 })}
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
      )}
      <form
        onSubmit={handleSubmit(onSubmitAdd)}
        className="space-y-5 flex items-center flex-col"
      >
        <label>Amount</label>
        <input
          className="h-10 flex items-center p-4 border-2 border-green-500 hover:bg-green-500 rounded-full text-black"
          {...register("liquidityAdd", { required: true, maxLength: 40 })}
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
