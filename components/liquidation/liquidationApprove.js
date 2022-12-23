import React, { useEffect, useState } from "react";
import { useEthers } from "@usedapp/core";
import { useForm } from "react-hook-form";
import Web3CreatePoolAdd from "../web3/useAddLiquidity";
import Web3Approve from "../web3/useApprove";

export const LiquidationApprove = () => {
  const [address, setAddress] = useState(false);
  const { activateBrowserWallet, deactivate, account, error } = useEthers();
  const { register, handleSubmit } = useForm();
  const { usePoolAdd } = Web3CreatePoolAdd();
  const { useApprove } = Web3Approve();

  const onSubmitAdd = async (data) => {
    console.log(data);

    await useApprove(data);
  };

  useEffect(() => {
    console.log({ account });
    if (account) {
      setAddress(account);
    }
  }, [account]);

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
