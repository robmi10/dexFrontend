import React from "react";
import { FaDiscord } from "react-icons/fa";
import { AiOutlineTwitter, AiOutlineReddit } from "react-icons/ai";
import { RiExchangeFundsFill } from "react-icons/ri";
const Footer = () => {
  return (
    <div className="w-full h-3/5 md:h-2/4 p-12 bg-slate-900 flex justify-center items-center  ">
      <div className="w-full  md:w-3/4 md:h-3/4 flex flex-col md:flex-row">
        <div className=" md:w-1/4 md:gap-2 md:h-4/6 flex flex-col items-center justify-between md:p-8 text-white">
          <RiExchangeFundsFill size={50} />
          <div className="flex gap-2 flex-row  text-gray-400">
            <FaDiscord
              size={50}
              className="hover:text-white hover:cursor-pointer"
            />
            <AiOutlineTwitter
              size={50}
              className="hover:text-white  hover:cursor-pointer"
            />
            <AiOutlineReddit
              size={50}
              className="hover:text-white  hover:cursor-pointer"
            />
          </div>
          <h1>© 2023 Dapp Labs</h1>
        </div>
        <div className=" mr-6 flex md:flex-row w-80  md:w-full">
          <div className="w-1/3 gap-2 justify-start md:w-1/4 flex flex-col md:gap-4 items-center text-gray-200 p-8 md:p-2">
            <h1 className="text-xl font-semibold">App</h1>
            <h1 className=" hover:cursor-pointer hover:text-white">Swap</h1>
            <h1 className=" hover:cursor-pointer hover:text-white">Tokens</h1>
            <h1 className=" hover:cursor-pointer hover:text-white">Pools</h1>
          </div>
          <div className="w-1/4 gap-2 justify-start md:w-1/4 flex flex-col md:gap-4 items-center text-gray-200 p-8 md:p-2">
            <h1 className="text-xl font-semibold">Protocol</h1>
            <h1 className=" hover:cursor-pointer hover:text-white">
              Community
            </h1>
            <h1 className=" hover:cursor-pointer hover:text-white">
              Governance
            </h1>
            <h1 className=" hover:cursor-pointer hover:text-white">
              Developers
            </h1>
          </div>
          <div className=" w-1/2 gap-2 justify-start md:w-1/4 md:flex flex-col md:gap-4 items-center text-gray-200 p-8 md:p-2">
            <h1 className="text-xl font-semibold">Company</h1>
            <h1 className=" hover:cursor-pointer hover:text-white">Careers</h1>
            <h1 className=" hover:cursor-pointer hover:text-white">Blog</h1>
            <h1 className=" hover:cursor-pointer hover:text-white">Forum</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
