import React, { useContext, useEffect, useState } from "react";
import Web3CreatePoolAdd from "./web3/useaddliquidity";
import { formatEther } from "ethers/lib/utils";
import { DexContext } from "./useContext/context";
import { BsArrowDownUp } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { VscPinned } from "react-icons/vsc";
import Web3GetSwapAmount from "./web3/useGetSwapAmount";
import { client } from "../sanityClient/client";
import imageUrlBuilder from "@sanity/image-url";
import { useToast } from "@chakra-ui/toast";
import SquareLoader, { Square } from "./animation/square/square";
const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

export const Swap = () => {
  const {
    poolList,
    activePool,
    setActivePool,
    calculateEthToDai,
    calculateDaiToEth,
    setModal,
    tokenlist,
    toastNotifcation,
    setToastNotifcation,
    setLoading,
    loading,
  } = useContext(DexContext);
  const { usePoolAdd } = Web3CreatePoolAdd();
  const [switchPair, setSwitchPair] = useState(false);
  const [tokenFirst, setTokenFirst] = useState(0);
  const [isExchangeNotAccepted, setIsExchangeNotAccepted] = useState("");
  const toast = useToast();

  useEffect(() => {
    if (toastNotifcation) {
      toastNotifcation.type === "swapToken" &&
        toast({
          title: "Swap",
          description: `${toastNotifcation.swappedBy} swapped ${formatEther(
            toastNotifcation.amount
          )} \n ${toastNotifcation.tokenFrom}  To  ${formatEther(
            toastNotifcation.estimatedAmount
          )} ${toastNotifcation.tokenTo}.`,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      toastNotifcation.type === "swapEth" &&
        toast({
          title: "Swap",
          description: `${toastNotifcation.swappedBy} swapped ${formatEther(
            toastNotifcation.amount
          )} \n ${toastNotifcation.tokenFrom}  To ${formatEther(
            toastNotifcation.estimatedAmount
          )} ${toastNotifcation.tokenTo}.`,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      setToastNotifcation(false);
      setLoading(false);
    }
  }, [toastNotifcation]);

  useEffect(() => {
    console.log({ loadinginSwap: loading });
  }, [
    poolList,
    activePool,
    calculateEthToDai,
    calculateDaiToEth,
    activePool,
    loading,
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

  if (!tokenlist) return false;

  const tokenPair = tokenlist.filter((option) => option.TokenId === activePool);

  console.log({ tokenPair });
  console.log({ tokenPairToken: tokenPair[0]?.Token });
  // const ethPair = poolListTokenValue[0]?.TokenPair[1];
  const pooladdress = poolListTokenValue[0]?.PoolAddress;

  console.log({ tokenlist });

  const ethPair = tokenlist?.filter((option) => option.TokenId === 1);

  console.log({ ethPair });

  if (!tokenPair) return false;

  return (
    <div className=" bg-slate-900 h-3/6 w-4/12 animate-fade rounded-xl text-white border border-gray-500 flex flex-col items-center relative ">
      <div className="space-y-2 flex justify-center items-center flex-col  w-full h-full p-2">
        <div className="w-full">
          <h1 className=" text-xl">Swap</h1>
        </div>

        <div className="h-24 flex w-full relative">
          <input
            className="bg-slate-800 w-full items-center p-4 text-white rounded-2xl text-4xl"
            value={tokenFirst}
            onChange={(e) => {
              setTokenFirst(e.target.value);
            }}
          ></input>

          {switchPair && (
            <button
              disabled
              onClick={() => {
                setModal("swap");
              }}
              className="absolute right-2 bg-slate-900 text-xl text-gray-400 rounded-full top-1/4 w-4/12 h-2/4 flex flex-row justify-center items-center gap-3"
            >
              <img className="w-8 h-8" src={urlFor(ethPair[0]?.TokenImage)} />
              <h1 className="  text-2xl">{ethPair[0]?.Token?.toUpperCase()}</h1>
              <VscPinned size={25} />
            </button>
          )}

          {!switchPair && (
            <button
              onClick={() => {
                setModal("swap");
              }}
              className="absolute right-2 bg-slate-900 text-xl text-gray-400 rounded-full top-1/4 w-4/12 h-2/4 flex flex-row justify-center items-center gap-3"
            >
              <img className="w-8 h-8" src={urlFor(tokenPair[0]?.TokenImage)} />
              <h1 className="  text-2xl">
                {tokenPair[0]?.Token?.toUpperCase()}
              </h1>
              <MdOutlineKeyboardArrowDown size={30} />
            </button>
          )}
        </div>

        <div className="absolute z-10 h-12 w-12 rounded-xl bg-gray-800 border-4 border-slate-900 flex justify-center top-44">
          <button
            className="hover:text-gray-300"
            onClick={() => {
              setSwitchPair(!switchPair);
            }}
          >
            <BsArrowDownUp size={25} />
          </button>
        </div>

        {
          <Web3GetSwapAmount
            activePool={activePool}
            tokenFirst={tokenFirst}
            switchPair={switchPair}
            tokenPair={tokenPair[0]}
            ethPair={ethPair}
            pooladdress={pooladdress}
            isExchangeNotAccepted={isExchangeNotAccepted}
            loading={loading}
          />
        }
      </div>
    </div>
  );
};
