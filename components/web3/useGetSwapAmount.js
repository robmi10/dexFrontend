import {
  useCall,
  useEtherBalance,
  useEthers,
  useTokenBalance,
} from "@usedapp/core";
import { Contract, ethers } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import React, { useContext, useState, useEffect } from "react";
import { BsArrowDownUp } from "react-icons/bs";
import { DaiTokenAddress, DexAddress } from "../../address";
import dexInfo from "../../constants/Dex.json";
import { DexContext } from "../useContext/context";
import { formatEther } from "ethers/lib/utils";
import Web3SwapToken from "./useswaptotoken";
import Web3SwapEth from "./useswaptoeth";
import eth from "../svg/eth.svg";
import Image from "next/image";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../sanityClient/client";
import { VscPinned } from "react-icons/vsc";
import SquareLoader from "../animation/square/square";

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

const Web3GetSwapAmount = ({
  activePool,
  tokenFirst,
  switchPair,
  pooladdress,
  tokenPair,
  ethPair,
  loading,
}) => {
  const { setCalculateEthToDai, setCalculateDaiToEth, setModal } =
    useContext(DexContext);
  const { account } = useEthers();
  const amount = tokenFirst;
  const currentPool = activePool;
  const dexInterface = new ethers.utils.Interface(dexInfo.abi);
  const dexAddressContract = new Contract(DexAddress, dexInterface);
  const [isExchangeNotAccepted, setIsExchangeNotAccepted] = useState("");
  const { useSwapToken } = Web3SwapToken();
  const { useSwapEth } = Web3SwapEth();
  const etherBalancePool = useEtherBalance(
    "0x2fAaB5074F8C2811F7e61202f1f47A2DA1A7899e"
  );
  const daiBalancePool = useTokenBalance(
    DaiTokenAddress,
    "0x2fAaB5074F8C2811F7e61202f1f47A2DA1A7899e"
  );

  const etherBalanceUser = useEtherBalance(account);
  const daiBalanceUser = useTokenBalance(DaiTokenAddress, account);

  console.log({ etherBalancePool: etherBalancePool?.toString() });
  console.log({ daiBalancePool: daiBalancePool?.toString() });

  console.log({ etherBalanceUser: etherBalanceUser?.toString() });
  console.log({ daiBalanceUser: daiBalanceUser?.toString() });

  useEffect(() => {}, [loading]);

  if (amount) {
    console.log({ amountParse: parseUnits(amount, 18).toString() });
  }

  const swapToEth = useCall(
    DexAddress &&
      amount && {
        contract: dexAddressContract,
        method: "_getSwapEthToToken",
        args: [
          tokenPair.PoolId,
          parseUnits(amount, 18).toString(),
          // { value: parseUnits(amount, 18).toString() },
        ],
      }
  );

  console.log({ poolID: tokenPair.PoolId });

  setCalculateDaiToEth(swapToEth?.value?.toString());

  useEffect(() => {
    handleToken();
  }, [switchPair, activePool]);

  const swapToDai = useCall(
    DexAddress &&
      amount && {
        contract: dexAddressContract,
        method: "_getSwapTokenToEth",
        args: [
          tokenPair.PoolId,
          parseUnits(amount, 18).toString(),
          // { value: parseUnits(amount, 18).toString() },
        ],
      }
  );

  console.log({ swapToEth: swapToEth?.value?.toString() });
  console.log({ swapToDai: swapToDai?.value?.toString() });

  console.log({ pooladdressInsideSwap: pooladdress });

  useEffect(() => {
    console.log("inside useffect now");
    handleToken();
  }, [swapToDai, swapToEth, amount]);

  const onSubmitAdd = () => {
    console.log({ pooladdress });
    console.log({ estimatedAmount: swapToEth?.value?.toString() });
    console.log({ tokenPair });
    console.log({ amount: parseUnits(amount, 18).toString() });
    !switchPair
      ? useSwapToken({
          tokenPair: tokenPair,
          amount: parseUnits(amount, 18).toString(),
          estimatedAmount: swapToDai?.value?.toString(),
          pooladdress: pooladdress,
        })
      : useSwapEth({
          tokenPair: tokenPair,
          amount: parseUnits(amount, 18).toString(),
          estimatedAmount: swapToEth?.value?.toString(),
          pooladdress: pooladdress,
        });
  };

  const handleToken = () => {
    let currentToken =
      switchPair && swapToEth?.value?.toString()
        ? formatEther(swapToEth?.value?.toString())
        : !switchPair && swapToDai?.value?.toString()
        ? formatEther(swapToDai?.value?.toString())
        : 0;

    if (parseFloat(currentToken) >= parseFloat(amount)) {
      setIsExchangeNotAccepted(false);
    } else {
      setIsExchangeNotAccepted(true);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center ">
      <div className="h-24 flex w-full relative z-0">
        <input
          onChange={() => {
            setTokenSecond(e.target.value);
          }}
          value={
            switchPair && swapToEth?.value?.toString()
              ? parseFloat(formatEther(swapToEth?.value?.toString())).toFixed(2)
              : !switchPair && swapToDai?.value?.toString()
              ? parseFloat(formatEther(swapToDai?.value?.toString())).toFixed(2)
              : 0
          }
          className="h-24 flex w-full bg-slate-800 items-center p-4 text-white rounded-2xl text-4xl"
        />
        {switchPair && (
          <button
            onClick={() => {
              setModal("swap");
            }}
            className="absolute right-2 bg-slate-900 text-xl text-gray-400 rounded-full top-1/4 w-4/12 h-2/4 flex flex-row justify-center items-center gap-1 md:gap-3"
          >
            <img className="w-8 h-8" src={urlFor(tokenPair?.TokenImage)} />
            <h1 className="text-2xl">{tokenPair?.Token?.toUpperCase()}</h1>
            <MdOutlineKeyboardArrowDown size={30} />
          </button>
        )}

        {!switchPair && (
          <button className="absolute right-2 bg-slate-900 text-xl text-gray-400 rounded-full top-1/4 w-4/12 h-2/4 flex flex-row justify-center items-center gap-1 md:gap-3">
            <img className="w-8 h-8" src={urlFor(ethPair[0]?.TokenImage)} />
            <h1 className="text-2xl">{ethPair[0]?.Token?.toUpperCase()}</h1>
            <VscPinned size={25} />
          </button>
        )}
      </div>

      <div className="h-6">
        {isExchangeNotAccepted && (
          <p className=" text-red-500 text-xs mt-1">
            Error To Little Amount For Swapping
          </p>
        )}
      </div>
      <button
        disabled={isExchangeNotAccepted}
        onClick={onSubmitAdd}
        className="w-2/4 justify-center mt-2 h-16 flex items-center border-2 hover:transition-all hover:duration-300 bg-slate-900 hover:text-indigo-900 hover:bg-white hover:cursor-pointer rounded-full"
      >
        {loading ? <SquareLoader square={true} /> : <h1>SWAP</h1>}
      </button>
    </div>
  );
};

export default Web3GetSwapAmount;
