import { useEtherBalance, useEthers, useTokenBalance } from "@usedapp/core";
import { formatEther } from "ethers/lib/utils";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { DaiTokenAddress } from "../../address";
import { DexContext } from "../useContext/context";
import Web3CreatePool from "../web3/usecreatepool";

const Createpool = () => {
  const { address, activePool, poolList } = useContext(DexContext);
  const { account } = useEthers();

  const lpAddress = poolList[activePool]?.LpAddress;
  const { usePool } = Web3CreatePool();
  const daiBalance = useTokenBalance(DaiTokenAddress, account);
  const etherBalance = useEtherBalance(account);
  const { register, handleSubmit } = useForm();
  const liquidityBalance = useTokenBalance(lpAddress, account);

  const createPool = (value) => {
    usePool(value);
  };

  return (
    <div className="flex items-center w-full flex-col gap-4">
      <div className="bg-blue-600 w-3/4 p-4 text-white flex flex-col items-center gap-20">
        <h1>DEX</h1>
        <h1>ACCOUNT</h1>
        <h1>{account}</h1>
        {daiBalance && etherBalance && liquidityBalance && (
          <div>
            <span>
              <h1>Dai Balance</h1>
              <h1>{formatEther(daiBalance?.toString())}</h1>
            </span>
            <span>
              <h1>LP Token Balance</h1>
              <h1>{formatEther(liquidityBalance?.toString())}</h1>
            </span>
            <span>
              <h1>ETH Balance</h1>
              <h1>{formatEther(etherBalance?.toString())}</h1>
            </span>
          </div>
        )}

        <form
          onSubmit={handleSubmit(createPool)}
          className="space-y-5 flex items-center flex-col"
        >
          <label>Token</label>
          <input
            className="h-10 flex p-4 border-2 border-green-500 hover:bg-green-500 rounded-full text-black"
            {...register("tokenPair", { required: true, maxLength: 40 })}
          />
          <button
            type="submit"
            className="h-10 flex items-center p-4 border-2 border-green-500 hover:bg-green-500 rounded-full"
          >
            CREATE POOL
          </button>
        </form>
      </div>
    </div>
  );
};

export default Createpool;
