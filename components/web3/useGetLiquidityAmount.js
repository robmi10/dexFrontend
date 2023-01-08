import {
  useCall,
  useEtherBalance,
  useEthers,
  useTokenBalance,
} from "@usedapp/core";
import { Contract, ethers } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import React, { useContext, useState, useEffect } from "react";
import { DaiTokenAddress, DexAddress } from "../../address";
import dexInfo from "../../constants/Dex.json";
import { DexContext } from "../useContext/context";
import { formatEther } from "ethers/lib/utils";
import Web3SwapToken from "./useswaptotoken";
import Web3SwapEth from "./useswaptoeth";
import btc from "../svg/btc.svg";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Image from "next/image";

const Web3GetLiquidityAmount = ({ _amount, remove }) => {
  const { setCalculateEthToDai, setCalculateDaiToEth, activePool, setModal } =
    useContext(DexContext);
  const { account } = useEthers();

  const dexInterface = new ethers.utils.Interface(dexInfo.abi);
  const dexAddressContract = new Contract(DexAddress, dexInterface);
  const [isExchangeNotAccepted, setIsExchangeNotAccepted] = useState("");
  const [amount, setAmount] = useState(0);

  const getLiquidityAmount = useCall(
    DexAddress &&
      amount && {
        contract: dexAddressContract,
        method: "_getLiquidityStatus",
        args: [activePool, parseUnits(amount, 18)],
      }
  );
  console.log({ getLiquidityAmount: getLiquidityAmount?.value?.toString() });
  // setCalculateDaiToEth(swapToEth?.value?.toString());

  const onSubmitAdd = (data) => {
    console.log({ liquidityAdd: parseUnits(liquidityAdd, 18) });
    usePoolAdd({
      poolInfo: filterPoolList[activePool],
      liquidity: parseUnits(_amount, 18),
    });
  };

  return (
    <div className="w-full flex h-full flex-col gap-2 justify-center items-center">
      <label className="w-full  ">Deposit Amount</label>
      <div className="h-24 flex w-full relative">
        <input
          className="bg-slate-800 w-full items-center p-4 text-white rounded-2xl text-4xl"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
        <button
          onClick={() => {
            setModal(true);
          }}
          className="absolute right-2 bg-slate-900 border  text-xl text-gray-500 rounded-full top-1/4 w-4/12 h-2/4 flex flex-row justify-center items-center gap-3"
        >
          <Image src={btc} className=" w-12 h-8" alt="btc" />
          <h1 className=" text-white text-2xl">BTC</h1>
          <MdOutlineKeyboardArrowDown size={30} />
        </button>
      </div>
      <button
        disabled={isExchangeNotAccepted}
        onClick={() => {
          onSubmitAdd();
        }}
        className="w-full justify-center mt-2 h-2/6 flex items-center border-2 bg-slate-900 hover:text-indigo-900 hover:bg-white hover:cursor-pointer rounded-full"
      >
        {remove ? <h1>Remove Liquidation</h1> : <h1>Add Liquidation </h1>}
      </button>
      {isExchangeNotAccepted && (
        <p className="text-red-500 text-xs ">Error To Not Accepted Liquidity</p>
      )}
    </div>
  );
};

export default Web3GetLiquidityAmount;
