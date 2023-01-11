import { useEtherBalance, useEthers, useTokenBalance } from "@usedapp/core";
import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { DaiTokenAddress } from "../../address";
import { DexContext } from "../useContext/context";
import Web3CreatePool from "../web3/usecreatepool";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../sanityClient/client";

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

const Createpool = () => {
  const { address, activePool, tokenlist, poolList, setModal, activeToken } =
    useContext(DexContext);
  const { account } = useEthers();

  const lpAddress = poolList[activePool]?.LpAddress;
  const { usePool } = Web3CreatePool();
  const daiBalance = useTokenBalance(DaiTokenAddress, account);
  const etherBalance = useEtherBalance(account);
  const { register, handleSubmit } = useForm();
  const liquidityBalance = useTokenBalance(lpAddress, account);
  const [tokenFirst, setTokenFirst] = useState(0);

  useEffect(() => {}, [activeToken]);

  const createPool = (value) => {
    console.log("inside create pool");
    console.log({ value });
    usePool(value);
  };

  if (!tokenlist) return false;
  const tokenPair = tokenlist.filter(
    (option) => option.TokenId === activeToken
  );

  const isActive = activeToken !== false;

  console.log({ tokenPair });
  console.log({ activeToken });

  console.log({ isActive });

  return (
    <div className="flex h-full w-full flex-col gap-4 justify-center items-center">
      <div className="w-2/4 gap-1 h-2/3 text-white flex flex-col items-center  ">
        <div className="w-full h-1/5  justify-between flex items-center p-4">
          <h1 className=" text-3xl">Pools</h1>
          <div className=" flex flex-row items-center rounded-full border border-gray-700 bg-slate-900 p-2 hover:cursor-pointer">
            <h1 className="text-xs ">More</h1>
            <MdOutlineKeyboardArrowDown size={20} />
          </div>
        </div>

        <div className=" bg-slate-900 w-full h-2/3 rounded-3xl border border-gray-600 justify-center items-center flex">
          <div className="space-y-5 flex items-center flex-col">
            <label>TOKEN</label>
            <div className="h-24 flex w-80 relative">
              {!isActive && (
                <button
                  onClick={() => {
                    setModal("token");
                  }}
                  className="h-16 w-full bg-blue-600 text-xl text-white rounded-full flex flex-row justify-center items-center gap-2"
                >
                  <h1 className="text-2xl">Select A Token</h1>
                  <MdOutlineKeyboardArrowDown size={30} />
                </button>
              )}
              {isActive && (
                <button
                  onClick={() => {
                    setModal("token");
                  }}
                  className="w-full h-full border border-gray-400 right-2 bg-slate-800 text-xl text-gray-400 rounded-full top-1/4 flex flex-row justify-center items-center gap-3"
                >
                  <img
                    className="w-8 h-8"
                    src={urlFor(tokenPair[0]?.TokenImage)}
                  />
                  <h1 className="  text-2xl">
                    {tokenPair[0]?.Token?.toUpperCase()}
                  </h1>
                  <MdOutlineKeyboardArrowDown size={30} />
                </button>
              )}
            </div>
            <button
              // disabled={isExchangeNotAccepted}
              onClick={() => {
                createPool(tokenPair[0]);
              }}
              className="w-full justify-center mt-2 h-20 flex items-center border-2 bg-slate-900 hover:text-indigo-900 hover:bg-white hover:cursor-pointer rounded-full"
            >
              Create Pool
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Createpool;
