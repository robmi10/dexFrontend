import React, { useEffect, useState } from "react";
import { useEthers } from "@usedapp/core";
import { useForm } from "react-hook-form";

export const Swap = () => {
  const [address, setAddress] = useState(false);
  const { activateBrowserWallet, deactivate, account, error } = useEthers();
  const { register, handleSubmit } = useForm();

  const onSubmitAdd = async (data) => {
    console.log(data);
  };

  return (
    <div className="bg-orange-800 w-3/4 p-4 text-white flex flex-col items-center gap-20">
      <h1>SWAP</h1>

      <form
        onSubmit={handleSubmit(onSubmitAdd)}
        className="space-y-5 flex items-center flex-col"
      >
        <label>Pool</label>
        <input
          type="number"
          className="h-10 flex items-center p-4 border-2 border-green-500 hover:bg-green-500 rounded-full text-black"
          {...register("liquidityPool", { required: true, maxLength: 40 })}
        />
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
