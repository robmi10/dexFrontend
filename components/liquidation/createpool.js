import { useEtherBalance, useEthers, useTokenBalance } from "@usedapp/core";
import { formatEther } from "ethers/lib/utils";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { DaiTokenAddress } from "../../address";
import { DexContext } from "../useContext/context";
import Web3CreatePool from "../web3/usecreatepool";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

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
    <div className="flex h-full w-full flex-col gap-4 justify-center items-center">
      <div className="w-2/4 gap-1 h-2/3 text-white flex flex-col items-center  ">
        <div className="w-full h-1/5  justify-between flex items-center p-4">
          <h1 className=" text-3xl">Pools</h1>
          <div className=" flex flex-row items-center rounded-full border border-gray-700 bg-slate-900 p-2 hover:cursor-pointer">
            <h1 className=" text-lg ">More</h1>
            <MdOutlineKeyboardArrowDown size={20} />
          </div>
        </div>

        <div className=" bg-slate-900 w-full h-2/3 rounded-3xl border border-gray-600 justify-center items-center flex">
          <form
            onSubmit={handleSubmit(createPool)}
            className="space-y-5 flex items-center flex-col"
          >
            <label>TOKEN</label>
            <input
              className="bg-slate-800 w-full items-center p-4 text-white rounded-2xl text-4xl"
              {...register("tokenPair", { required: true, maxLength: 40 })}
            />
            <button
              type="submit"
              className="w-full justify-center mt-2 h-16 flex items-center border-2 bg-indigo-900 hover:text-indigo-900 hover:bg-white hover:cursor-pointer rounded-full"
            >
              CREATE POOL
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Createpool;
