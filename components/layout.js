import Link from "next/link";
import React, { useContext, useEffect } from "react";
import { DexContext } from "./useContext/context";
import { AiOutlineClose } from "react-icons/ai";
import { useEthers } from "@usedapp/core";

const Layout = ({ children }) => {
  const { setModal, modal } = useContext(DexContext);
  const { activateBrowserWallet, deactivate, account } = useEthers();

  useEffect(() => {}, [modal]);

  if (modal === "menu")
    return (
      <>
        <div className="bg-slate-900 w-full flex h-screen  justify-center p-8">
          <div className="w-full justify-center items-center text-white flex-col ">
            <AiOutlineClose
              size={30}
              onClick={() => {
                setModal(false);
              }}
            />

            <div className=" mt-40 flex flex-col gap-20 w-full justify-center items-center text-2xl font-semibold">
              <Link
                className="text-gray-300 hover:text-white hover:cursor-pointer hover:transition-all hover:duration-200"
                href="/swap"
                onClick={() => {
                  setModal(false);
                }}
              >
                Swap
              </Link>
              <Link
                className="text-gray-300 hover:text-white hover:cursor-pointer hover:transition-all hover:duration-200"
                href="/pool"
                onClick={() => {
                  setModal(false);
                }}
              >
                Pool
              </Link>
              <Link
                className="text-gray-300 hover:text-white hover:cursor-pointer hover:transition-all hover:duration-200"
                href="/add"
                onClick={() => {
                  setModal(false);
                }}
              >
                Add
              </Link>
              <Link
                className="text-gray-300 hover:text-white hover:cursor-pointer hover:transition-all hover:duration-200"
                href="/remove"
                onClick={() => {
                  setModal(false);
                }}
              >
                Remove
              </Link>

              <div className="flex w-1/4  items-center p-5 justify-center">
                {!account && (
                  <button onClick={activateBrowserWallet}>
                    CONNECT WALLET
                  </button>
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
        </div>
      </>
    );

  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default Layout;
