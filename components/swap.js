import React, { useContext, useEffect, useState } from "react";
import { formatEther } from "ethers/lib/utils";
import { DexContext } from "./useContext/context";
import { BsArrowDownUp } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { VscPinned } from "react-icons/vsc";
import Web3GetSwapAmount from "./web3/usegetswapamount";
import { client } from "../sanityClient/client";
import imageUrlBuilder from "@sanity/image-url";
import { useToast } from "@chakra-ui/toast";
const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

export const Swap = () => {
  const {
    poolList,
    activePool,
    setModal,
    tokenlist,
    toastNotifcation,
    setToastNotifcation,
    setLoading,
    loading,
  } = useContext(DexContext);
  const [switchPair, setSwitchPair] = useState(false);
  const [tokenFirst, setTokenFirst] = useState(0);
  const [isExchangeNotAccepted] = useState("");
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

  useEffect(() => {}, [poolList, activePool, loading]);

  if (!poolList && !activePool && activePool !== 0 && !tokenlist) return false;

  const tokenPair = tokenlist.filter((option) => option.TokenId === activePool);
  const poolListTokenValue = poolList.filter(
    (option) => option.PoolId === tokenPair[0].PoolId
  );

  if (!poolListTokenValue && !tokenPair) return false;

  const pooladdress = poolListTokenValue[0]?.PoolAddress;
  const ethPair = tokenlist?.filter((option) => option.TokenId === 1);

  return (
    <div className=" bg-slate-900 w-11/12 h-3/6 md:w-4/12 animate-fade rounded-xl text-white border border-gray-500 flex flex-col items-center relative ">
      <div className="space-y-2 flex justify-center items-center flex-col  w-full h-full p-2">
        <div className="w-full">
          <h1 className=" text-xl">Swap</h1>
        </div>

        <div className="h-24 flex w-full relative">
          <input
            type="number"
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
              className="absolute right-2 bg-slate-900 text-xl text-gray-400 rounded-full top-1/4 w-4/12 h-2/4 flex flex-row justify-center items-center gap-1 md:gap-3"
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
              className="absolute right-2 bg-slate-900 md:text-xl text-gray-400 rounded-full top-1/4 w-4/12 h-2/4 flex flex-row justify-center items-center gap-1 md:gap-3"
            >
              <img className="w-8 h-8" src={urlFor(tokenPair[0]?.TokenImage)} />
              <h1 className="  text-2xl">
                {tokenPair[0]?.Token?.toUpperCase()}
              </h1>
              <MdOutlineKeyboardArrowDown size={30} />
            </button>
          )}
        </div>

        <button
          onClick={() => {
            setSwitchPair(!switchPair);
          }}
          className="absolute z-10 h-12 w-12 items-center rounded-xl bg-gray-800 border-4 border-slate-900 flex justify-center top-44"
        >
          <BsArrowDownUp size={25} className="hover:text-gray-300" />
        </button>

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
