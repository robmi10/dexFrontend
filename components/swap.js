import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Web3CreatePoolAdd from "../components/web3/useaddliquidity";
import { formatEther } from "ethers/lib/utils";
import { DexContext } from "./useContext/context";
import { BsArrowDownUp } from "react-icons/bs";

export const Swap = () => {
  const { poolList, activePool, setActivePool } = useContext(DexContext);
  const { usePoolAdd } = Web3CreatePoolAdd();
  const [switchPair, setSwitchPair] = useState(false);
  const [calculatedAmount, setCalculatedAmount] = useState(0);
  const [tokenFirst, setTokenFirst] = useState(0);
  const [tokenSecond, setTokenSecond] = useState(0);

  useEffect(() => {
    console.log({ calculatedAmount });
  }, [poolList, activePool]);

  if (!poolList) return false;

  const filterPoolList = poolList.map((option, i) => ({
    index: i,
    address: option.PoolAddress,
  }));

  const isPoolist = filterPoolList.length > 0;

  // filtrera så du kan få värdet

  const onSubmitAdd = (data) => {
    console.log({ data });

    console.log({ tokenFirst });
    console.log({ calculatedAmount });
    // usePoolAdd({
    //   poolInfo: filterPoolList[activePool],
    //   liquidity: data.liquidityAdd,
    // });
  };

  const updateValue = ({ target }) => {
    setActivePool(parseInt(target.value));
  };

  if (!activePool && activePool !== 0) return false;
  const poolListTokenValue = poolList.filter(
    (option) => option.PoolId === activePool
  );

  if (!poolListTokenValue) return false;

  const calculatePairSwitch = (val) => {
    let amount = val.target.value;
    console.log({ val: val.target.value });

    let inputAmountFee = amount * 99;
    let outputAmount =
      (inputAmountFee * poolListTokenValue[0]?.EthAmount) /
      (amount + poolListTokenValue[0]?.TokenReserve);

    setCalculatedAmount(outputAmount);
  };
  const tokenPair = poolListTokenValue[0]?.TokenPair[0];
  const ethPair = poolListTokenValue[0]?.TokenPair[1];

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
          onChange={(e) => {
            calculatePairSwitch(e);
            setTokenFirst(e.target.value);
          }}
          className="h-10 flex items-center p-4 border-2 border-green-500 hover:bg-green-500 rounded-full text-black"
        />
        <button
          onClick={() => {
            setSwitchPair(!switchPair);
          }}
        >
          <BsArrowDownUp size={40} />
        </button>

        <label>
          {switchPair ? ethPair?.toUpperCase() : tokenPair?.toUpperCase()}
        </label>
        <input
          onChange={() => {
            setTokenSecond(e.target.value);
          }}
          value={calculatedAmount}
          className="h-10 flex items-center p-4 border-2 border-green-500 hover:bg-green-500 rounded-full text-black"
        />
        <button
          onClick={onSubmitAdd}
          className="h-10 flex items-center p-4 border-2 border-green-500 hover:bg-green-500 rounded-full"
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
};
