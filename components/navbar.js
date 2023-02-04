import React, { useContext, useState } from "react";
import { useEthers } from "@usedapp/core";
import { DexContext } from "./useContext/context";
import { RiExchangeFundsFill } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";

import Link from "next/link";

export const Navbar = () => {
  const { setModal } = useContext(DexContext);
  const { activateBrowserWallet, deactivate, account } = useEthers();
  const [dropdown, setDropdown] = useState(false);

  return (
    <>
      <div className="flex justify-center">
        <div className="bg-slate-900 w-full flex h-20 flex-row justify-between items-center  text-white">
          <div className=" w-full md:w-2/6 h-full flex items-center p-5 justify-between">
            <Link href="/">
              <RiExchangeFundsFill size={50} />
            </Link>

            <div className="flex md:hidden w-full h-full  items-center p-5 ">
              {account && <h1>{account?.toString()?.substr(0, 10)}</h1>}
            </div>

            <button
              onClick={() => {
                setModal("menu");
              }}
              className="flex md:hidden text-white font-medium hover:cursor-pointer hover:text-white"
            >
              <RxHamburgerMenu size={30} />
            </button>

            <Link
              href="/swap"
              className="hidden md:flex text-gray-400 font-medium hover:cursor-pointer hover:text-white"
            >
              SWAP
            </Link>
            <Link
              href="/pool"
              className="hidden md:flex text-gray-400 font-medium hover:cursor-pointer hover:text-white"
            >
              POOL
            </Link>
            <div
              className="hidden md:flex mt-4 relative  h-full"
              onMouseEnter={() => {
                setDropdown(true);
              }}
              onMouseLeave={() => {
                setDropdown(false);
              }}
            >
              <button className="text-gray-400 md:flex font-medium hover:cursor-pointer hover:text-white">
                LIQUIDITY
              </button>
              {dropdown && (
                <div className="absolute  bg-slate-800 transition-all duration-200 rounded-md z-10 flex flex-col justify-between w-36 h-24 gap-2 -ml-8 ">
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
          <div className="hidden md:flex w-1/4 h-full  items-center p-5 ">
            {account && <h1>{account?.toString()?.substr(0, 10)}</h1>}
          </div>
          <div className="hidden md:flex w-1/4  items-center p-5 justify-center">
            {!account && (
              <button onClick={activateBrowserWallet}>CONNECT WALLET</button>
            )}
            {account && (
              <button
                className="h-10 hidden md:flex items-center p-4 border-2 border-white-500 hover:bg-white hover:text-indigo-900 rounded-full"
                onClick={deactivate}
              >
                DISCONNECT
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
