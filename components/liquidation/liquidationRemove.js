import React, { useEffect, useState } from "react";
import { useEthers } from "@usedapp/core";
import { useForm } from "react-hook-form";

export const LiquidationRemove = () => {
  const [address, setAddress] = useState(false);
  const { activateBrowserWallet, deactivate, account, error } = useEthers();
  const { register, handleSubmit } = useForm();

  const onSubmitRemove = (data) => {
    console.log(data);
  };
  useEffect(() => {
    console.log({ account });
    if (account) {
      setAddress(account);
    }
  }, [account]);

  return (
    <div className="bg-green-800 w-3/4 p-4 text-white flex flex-col items-center gap-20">
      <h1>Remove Liquidity</h1>

      <form
        onSubmit={handleSubmit(onSubmitRemove)}
        className="space-y-5 flex items-center flex-col"
      >
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
