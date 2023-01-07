import React, { useContext, useEffect, useState } from "react";
import Web3CreatePoolAdd from "../components/web3/useaddliquidity";
import { formatEther } from "ethers/lib/utils";
import { DexContext } from "./useContext/context";
import { BsArrowDownUp } from "react-icons/bs";

import Web3GetSwapAmount from "./web3/useGetSwapAmount";

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
    <div className="bg-purple-800 w-3/4 p-4 text-white flex flex-col items-center gap-20">
      {isPoolist && (
        <>
          <h1>Swap</h1>
          <div className=" flex flex-row gap-4">
            <span>
              <h1>LP Token Balance</h1>
              <h1>{formatEther(poolListTokenValue[0]?.TokenAmount || 0)}</h1>
            </span>
            <span>
              <h1>Eth Balance</h1>
              <h1>{formatEther(poolListTokenValue[0]?.EthAmount || 0)}</h1>
            </span>
          </div>
          <section>
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
          </section>
        </>
      )}
      <div className="space-y-5 flex items-center flex-col">
        <label>
          {switchPair ? tokenPair?.toUpperCase() : ethPair?.toUpperCase()}
        </label>
        <input
          value={tokenFirst}
          onChange={(e) => {
            setTokenFirst(e.target.value);
          }}
          className="h-10 flex items-center p-4 border-2 border-green-500 hover:bg-green-500 rounded-full text-black"
        />
        <button
          className="hover:text-yellow-500"
          onClick={() => {
            setSwitchPair(!switchPair);
          }}
        >
          <BsArrowDownUp size={40} />
        </button>

        {isExchangeNotAccepted && (
          <p className="text-red-500 text-xs ">
            Error To Little Amount For Swapping
          </p>
        )}

        <label>
          {switchPair ? ethPair?.toUpperCase() : tokenPair?.toUpperCase()}
        </label>

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
