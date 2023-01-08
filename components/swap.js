import React, { useContext, useEffect, useState } from "react";
import Web3CreatePoolAdd from "../components/web3/useaddliquidity";
import { formatEther } from "ethers/lib/utils";
import { DexContext } from "./useContext/context";
import { BsArrowDownUp } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Web3GetSwapAmount from "./web3/useGetSwapAmount";
import btc from "./svg/btc.svg";
import Image from "next/image";

export const Swap = () => {
  const {
    poolList,
    activePool,
    setActivePool,
    calculateEthToDai,
    calculateDaiToEth,
  } = useContext(DexContext);
  const { usePoolAdd } = Web3CreatePoolAdd();
  const [switchPair, setSwitchPair] = useState(false);
  const [tokenFirst, setTokenFirst] = useState(0);
  const [isExchangeNotAccepted, setIsExchangeNotAccepted] = useState("");

  useEffect(() => {}, [
    poolList,
    activePool,
    calculateEthToDai,
    calculateDaiToEth,
  ]);

  if (!poolList) return false;

  const filterPoolList = poolList.map((option, i) => ({
    index: i,
    address: option.PoolAddress,
  }));

  const isPoolist = filterPoolList.length > 0;

  const updateValue = ({ target }) => {
    setActivePool(parseInt(target.value));
  };

  if (!activePool && activePool !== 0) return false;
  const poolListTokenValue = poolList.filter(
    (option) => option.PoolId === activePool
  );

  if (!poolListTokenValue) return false;

  const tokenPair = poolListTokenValue[0]?.TokenPair[0];
  const ethPair = poolListTokenValue[0]?.TokenPair[1];
  const pooladdress = poolListTokenValue[0]?.PoolAddress;

  return (
    <div className=" bg-slate-800 h-3/6 w-4/12 rounded-xl text-white border border-gray-500 flex flex-col items-center relative ">
      {isPoolist && (
        <>
          {/* <h1>Swap</h1>
          <div className=" flex flex-row gap-4">
            <span>
              <h1>LP Token Balance</h1>
              <h1>{formatEther(poolListTokenValue[0]?.TokenAmount || 0)}</h1>
            </span>
            <span>
              <h1>Eth Balance</h1>
              <h1>{formatEther(poolListTokenValue[0]?.EthAmount || 0)}</h1>
            </span>
          </div> */}
          {/* <section>
            <label>Pool</label>
            <select
              onChange={updateValue}
              className="w-full text-black p-2 rounded-md border flex justify-center"
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
          </section> */}
        </>
      )}
      <div className="space-y-2 flex justify-center items-center flex-col  w-full h-full p-2">
        {/* <label>
          {switchPair ? tokenPair?.toUpperCase() : ethPair?.toUpperCase()}
        </label> */}
        <div className="w-full">
          <h1 className=" text-xl">Swap</h1>
        </div>

        <div className="h-24 flex w-full relative">
          <input
            className="bg-slate-600 w-full items-center p-4 text-white rounded-2xl text-4xl"
            value={tokenFirst}
            onChange={(e) => {
              setTokenFirst(e.target.value);
            }}
          ></input>

          <button className="absolute right-2 bg-white text-xl text-gray-500 rounded-full top-1/4 w-4/12 h-2/4 flex flex-row justify-center items-center gap-3">
            <Image src={btc} className=" w-12 h-8" alt="btc" />

            <h1 className=" font-bold text-2xl">
              {switchPair ? ethPair?.toUpperCase() : tokenPair?.toUpperCase()}
            </h1>
            <MdOutlineKeyboardArrowDown size={30} />
          </button>
        </div>

        <div className="absolute z-10 h-12 w-12 rounded-xl bg-gray-700 border-4 border-slate-900 flex justify-center top-44">
          <button
            className="hover:text-gray-300"
            onClick={() => {
              setSwitchPair(!switchPair);
            }}
          >
            <BsArrowDownUp size={25} />
          </button>
        </div>
        {/* 
        {isExchangeNotAccepted && (
          <p className="text-red-500 text-xs ">
            Error To Little Amount For Swapping
          </p>
        )}

        <label>
          {switchPair ? ethPair?.toUpperCase() : tokenPair?.toUpperCase()}
        </label> */}

        {
          <Web3GetSwapAmount
            activePool={activePool}
            tokenFirst={tokenFirst}
            switchPair={switchPair}
            tokenPair={tokenPair}
            ethPair={ethPair}
            pooladdress={pooladdress}
            isExchangeNotAccepted={isExchangeNotAccepted}
          />
        }
      </div>
    </div>
  );
};
