import { useState, useEffect, useContext } from "react";
import Modal from "../components/modal/modal";
import { DexContext } from "../components/useContext/context";
import { AiOutlineArrowDown } from "react-icons/ai";
import { BiDollar, BiTrendingUp } from "react-icons/bi";

import Link from "next/link";
import Footer from "../components/footer";

export default function Home() {
  const { modal } = useContext(DexContext);
  useEffect(() => {}, [modal]);

  return (
    <div className="h-screen w-screen ">
      <div className="flex w-full h-full bg-indigo-900 justify-center items-center flex-col gap-8 text-white">
        <h1 className=" text-7xl font-bold">Trade crypto with confidence</h1>
        <h2 className=" text-xl font-bold">Buy, sell, and explore tokens</h2>
        <button className=" text-xl w-36 h-12  bg-pink-300 rounded-full hover:bg-pink-500">
          Get started
        </button>
        <Link
          scroll={false}
          href="#second-section"
          className=" text-gray-400 text-lg flex flex-row justify-center items-center hover:text-gray-500"
        >
          <h1>Learn more</h1>
          <AiOutlineArrowDown />
        </Link>
      </div>
      <div
        className="bg-indigo-800 h-full w-full flex justify-center items-center"
        id="second-section"
      >
        <div className=" w-full h-3/4 justify-center items-center flex flex-col gap-4">
          <Link
            href="/swap"
            className="h-2/4 w-2/4 flex bg-indigo-900 rounded-lg p-8 justify-between flex-col hover:border hover:border-gray-400 hover:bg-indigo-900 hover:cursor-pointer"
          >
            <h1 className=" text-white text-4xl font-semibold">Swap tokens</h1>

            <div>
              <p className=" text-white text-xl">
                Buy, sell, and explore tokens on Ethereum, Polygon, Optimism,
                and more.
              </p>

              <button className=" text-blue-300 text-xl hover:text-blue-500">
                Trade tokens
              </button>
            </div>
          </Link>
          <div className=" flex w-full  h-2/4 gap-4 justify-center items-center">
            <Link
              href="https://support.uniswap.org/hc/en-us/articles/11306574799117-How-to-use-Moon-Pay-on-the-Uniswap-web-app-"
              target="_blank"
              className="h-full w-1/4 flex bg-indigo-900 rounded-lg p-8 justify-between flex-col hover:border hover:border-gray-400 hover:bg-indigo-800 hover:cursor-pointer"
            >
              <div className=" text-white flex items-center justify-between">
                <h1 className=" text-white text-4xl font-semibold">
                  Buy crypto
                </h1>
                <BiDollar size={40} />
              </div>
              <div>
                <p className=" text-white text-xl">
                  Buy, sell, and explore tokens on Ethereum, Polygon, etc.
                </p>
                <button className=" text-blue-300 text-xl hover:text-blue-500">
                  Buy now
                </button>
              </div>
            </Link>
            <Link
              href="/pool"
              className="h-full w-1/4 flex bg-indigo-900 rounded-lg p-8 justify-between flex-col hover:border hover:border-gray-400 hover:bg-indigo-800 hover:cursor-pointer"
            >
              <div className=" text-white flex items-center justify-between">
                <h1 className=" text-white text-4xl font-semibold">Earn</h1>
                <BiTrendingUp size={40} />
              </div>
              <div>
                <p className=" text-white text-xl">
                  Provide liquidity to pools on Uniswap and earn fees on swaps.
                </p>
                <button className=" text-blue-300 text-xl hover:text-blue-500">
                  Provide liquidity
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
