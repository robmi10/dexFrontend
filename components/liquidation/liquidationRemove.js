import React, { useEffect, useState, useContext } from "react";
import { useEthers } from "@usedapp/core";
import { useForm } from "react-hook-form";
import Web3CreatePoolRemove from "../web3/useremoveliquidity";
import { DexContext } from "../useContext/context";
import { formatEther } from "ethers/lib/utils";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import { VscPinned } from "react-icons/vsc";

import Web3GetLiquidityAmount from "../web3/useGetLiquidityAmount";

import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../sanityClient/client";
const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

export const LiquidationRemove = () => {
  const {
    poolList,
    activePool,
    tokenlist,
    setActivePool,
    setModal,
    activeToken,
  } = useContext(DexContext);

  useEffect(() => {}, [poolList, activePool]);

  if (!poolList) return false;

  const filterPoolList = poolList.map((option, i) => ({
    index: i,
    address: option.PoolAddress,
  }));

  const tokenPair = tokenlist.filter(
    (option) => option.TokenId === activeToken
  );

  if (!tokenPair) return false;

  const filterPoolToken = filterPoolList.filter(
    (option, index) => option.index === tokenPair[0].PoolId
  );

  console.log({ filterPoolToken });

  const ethPair = tokenlist?.filter((option) => option.TokenId === 1);

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
              <button className="h-16 w-full disabled bg-slate-800 text-xl text-white rounded-full  flex flex-row justify-between p-4 items-center gap-2">
                <img className="w-8 h-8" src={urlFor(ethPair[0]?.TokenImage)} />

                <h1 className="text-2xl">{ethPair[0]?.Token}</h1>
                <VscPinned size={25} />
              </button>
              {!tokenPair[0]?.TokenStatus && (
                <button
                  onClick={() => {
                    setModal("swap");
                  }}
                  className="h-16 w-full bg-blue-600 text-xl text-white rounded-full flex flex-row justify-center items-center gap-2"
                >
                  <h1 className="text-2xl">Select A Token</h1>
                  <MdOutlineKeyboardArrowDown size={30} />
                </button>
              )}

              {tokenPair[0]?.TokenStatus && (
                <button
                  onClick={() => {
                    setModal("swap");
                  }}
                  className="h-16 w-full disabled bg-slate-800 text-xl text-white rounded-full  flex flex-row justify-between p-4 items-center gap-2"
                >
                  <img
                    className="w-8 h-8"
                    src={urlFor(tokenPair[0]?.TokenImage)}
                  />

                  <h1 className="text-2xl">{tokenPair[0]?.Token}</h1>
                  <MdOutlineKeyboardArrowDown size={30} />
                </button>
              )}
            </div>
            <div className=" w-2/4 rounded-lg h-full bg-slate-900 border border-gray-700 p-4 text-lg flex flex-row justify-between">
              <div className=" flex flex-col gap-2">
                <h1 className=" font-bold text-white">Free Tier</h1>
                <h1>1% fee earning.</h1>
              </div>
              <div className=" justify-center items-center flex">
                <button className="bg-slate-800 h-8 w-12 rounded-md">
                  Hide
                </button>
              </div>
            </div>
          </div>
          <div className="w-2/4 h-2/4">
            <Web3GetLiquidityAmount
              remove={true}
              tokenPair={tokenPair}
              poolInfo={filterPoolToken[0]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
