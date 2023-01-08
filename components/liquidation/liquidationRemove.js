import React, { useEffect, useState, useContext } from "react";
import { useEthers } from "@usedapp/core";
import { useForm } from "react-hook-form";
import Web3CreatePoolRemove from "../web3/useremoveliquidity";
import { DexContext } from "../useContext/context";
import { formatEther } from "ethers/lib/utils";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Image from "next/image";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import btc from "../svg/btc.svg";
import eth from "../svg/eth.svg";
import Web3GetLiquidityAmount from "../web3/useGetLiquidityAmount";

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
    <div className="bg-slate-900 border border-gray-600 w-3/4 h-3/4 rounded-xl p-4 text-white flex flex-col items-center gap-20">
      <div className="space-y-5 flex items-center flex-col h-full w-full">
        <div className=" w-full flex flex-row h-1/6 items-center justify-between p-4 text-xl border-b border-gray-700 text-gray-300">
          <Link href="/swap">
            <AiOutlineArrowLeft className=" hover:cursor-pointer " />
          </Link>
          <h1>Remove Liquidity</h1>
          <h1 className=" text-sm text-blue-700 hover:cursor-pointer hover:text-blue-900">
            Clear All
          </h1>
        </div>
        <div className=" w-full  flex flex-col h-full  items-center justify-between p-4 text-xl  border-gray-700 text-gray-300">
          <div className="w-full  h-2/4 flex flex-col items-center text-xl space-y-4">
            <h1 className="w-2/4">Select Pair</h1>
            <div className="mt-4 flex flex-row gap-2 w-2/4">
              <button
                onClick={() => {
                  setModal(true);
                }}
                className="h-16 w-full bg-slate-800 text-xl text-white rounded-full  flex flex-row justify-between p-4 items-center gap-2"
              >
                <Image src={eth} className=" w-8 h-8" alt="eth" />

                <h1 className="text-2xl">ETH</h1>
                <MdOutlineKeyboardArrowDown size={30} />
              </button>
              <button
                onClick={() => {
                  setModal(true);
                }}
                className="h-16 w-full bg-blue-600 text-xl text-white rounded-full flex flex-row justify-center items-center gap-2"
              >
                <h1 className="text-2xl">Select A Token</h1>
                <MdOutlineKeyboardArrowDown size={30} />
              </button>
            </div>
            <div className=" w-2/4 rounded-lg h-full bg-slate-900 border border-gray-700 p-4 text-lg flex flex-row justify-between">
              <div className=" flex flex-col gap-2">
                <h1 className=" font-bold text-white">Free Tier</h1>
                <h1>The % you will earn in fees.</h1>
              </div>
              <div className=" justify-center items-center flex">
                <button className="bg-slate-800 h-12 w-12 rounded-md">
                  Hide
                </button>
              </div>
            </div>
          </div>
          <div className="w-2/4 h-2/4">
            <Web3GetLiquidityAmount
              remove={true}
              poolInfo={filterPoolList[activePool]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
