import React, { useEffect, useContext, useState } from "react";
import { useEthers } from "@usedapp/core";
import { DexContext } from "./useContext/context";
import { RiExchangeFundsFill } from "react-icons/ri";
import Link from "next/link";

export const Navbar = () => {
  const { address, setAddress } = useContext(DexContext);
  const { activateBrowserWallet, deactivate, account, error } = useEthers();
  const [dropdown, setDropdown] = useState(false);

  return (
    <div className="flex justify-center">
      <div className="bg-indigo-900 w-full flex h-20 flex-row justify-between items-center  text-white">
        <div className=" w-2/6 h-full flex items-center p-5 justify-between">
          <RiExchangeFundsFill size={50} />

          <Link
            href="/swap"
            className="text-gray-400 font-medium hover:cursor-pointer hover:text-white"
          >
            SWAP
          </Link>
          <Link
            href="/pool"
            className="text-gray-400 font-medium hover:cursor-pointer hover:text-white"
          >
            POOL
          </Link>
          <div
            className="mt-4 relative  h-full"
            onMouseEnter={() => {
              setDropdown(true);
            }}
            onMouseLeave={() => {
              setDropdown(false);
            }}
          >
            <button
              // onClick={() => {
              //   setDropdown(!dropdown);
              // }}

              className="text-gray-400 font-medium hover:cursor-pointer hover:text-white"
            >
              LIQUIDITY
            </button>
            {dropdown && (
              <div className="absolute mt-2 bg-indigo-700 rounded-md z-10 flex flex-col justify-between w-36 h-24 gap-2 -ml-8 ">
                <Link
                  href="/add"
                  className=" justify-center text-gray-400 rounded-md h-full items-center flex hover:text-white  w-full"
                >
                  Add
                </Link>
                <Link
                  href="/remove"
                  className=" justify-center text-gray-400 rounded-md h-full items-center flex hover:text-white  w-full"
                >
                  Remove
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className=" w-1/4 h-full flex items-center p-5 ">
          {account && <h1>{account?.toString()?.substr(0, 10)}</h1>}
        </div>
        <div className=" w-1/4 flex items-center p-5 justify-center">
          {!account && (
            <button onClick={activateBrowserWallet}>CONNECT WALLET</button>
          )}
          {account && (
            <button
              className="h-10 flex items-center p-4 border-2 border-white-500 hover:bg-white hover:text-indigo-900 rounded-full"
              onClick={deactivate}
            >
              DISCONNECT
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
