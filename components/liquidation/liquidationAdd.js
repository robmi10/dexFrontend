import React, { useContext, useEffect, useState } from "react";
import { useEthers } from "@usedapp/core";
import { useForm, Controller } from "react-hook-form";
import Web3CreatePoolAdd from "../web3/useaddliquidity";
import Web3Approve from "../web3/useapprove";
import { DexContext } from "../useContext/context";
import Select from "react-select";

export const LiquidationAdd = () => {
  const { poolList } = useContext(DexContext);
  const [address, setAddress] = useState(false);
  const { activateBrowserWallet, deactivate, account, error } = useEthers();
  const { register, handleSubmit } = useForm();

  // const methods = useForm();
  const onSubmitAdd = (data) => {
    const { usePoolAdd } = Web3CreatePoolAdd();
    console.log(data);
    usePoolAdd(data);
  };

  if (!poolList || poolList.length === 0) return false;
  console.log({ poolList });
  return (
    <div className="bg-purple-800 w-3/4 p-4 text-white flex flex-col items-center gap-20">
      <h1>Add Liquidity</h1>
      <section>
        <label>Pool</label>
        <select as={Select} name="Name" options={poolList}>
          {poolList.map((options) => {
            return <option>{options}</option>;
          })}
        </select>
      </section>
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
