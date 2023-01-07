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
const Web3GetLiquidityAmount = ({ _amount }) => {
  const { setCalculateEthToDai, setCalculateDaiToEth, activePool } =
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
    <div className="w-full flex flex-col gap-5 justify-center items-center">
      <label>Amount</label>
      <input
        className="h-10 flex items-center p-4 border-2 border-green-500 hover:bg-green-500 rounded-full text-black"
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      />
      <button
        disabled={isExchangeNotAccepted}
        onClick={() => {
          onSubmitAdd();
        }}
        className="h-10 flex items-center p-4 border-2 border-green-500 hover:bg-green-500 rounded-full"
      >
        SUBMIT
      </button>
      {isExchangeNotAccepted && (
        <p className="text-red-500 text-xs ">Error To Not Accepted Liquidity</p>
      )}
    </div>
  );
};

export default Web3GetLiquidityAmount;
