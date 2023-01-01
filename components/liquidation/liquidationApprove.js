import React, { useEffect, useState } from "react";
import { useEthers } from "@usedapp/core";
import { useForm } from "react-hook-form";
import Web3CreatePoolAdd from "../web3/useaddliquidity";
import Web3Approve from "../web3/useapprove";

export const LiquidationApprove = () => {
  const [address, setAddress] = useState(false);
  const { register, handleSubmit } = useForm();
  const { useApprove } = Web3Approve();

  const onSubmitAdd = async (data) => {
    const { usePoolAdd } = Web3CreatePoolAdd();
    console.log(data);
    useApprove(data);
  };

  return (
    <div className="bg-purple-800 w-3/4 p-4 text-white flex flex-col items-center gap-20">
      <h1>Approve Liquidity</h1>

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
