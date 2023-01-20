import React from "react";
import { FaDiscord } from "react-icons/fa";
import { AiOutlineTwitter, AiOutlineReddit } from "react-icons/ai";
import { RiExchangeFundsFill } from "react-icons/ri";
const Footer = () => {
  return (
    <div className=" w-full bg-indigo-900 h-2/5 flex justify-center items-center">
      <div className="  w-3/4 h-3/4 flex ">
        <div className="  w-1/4 flex flex-col items-center justify-between p-8 text-white">
          <RiExchangeFundsFill size={50} />
          <div className="flex flex-row text-gray-400">
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
        <div className="  w-1/4 flex flex-col gap-4 items-center text-gray-200 p-8">
          <h1 className="text-xl font-semibold">App</h1>
          <h1 className=" hover:cursor-pointer hover:text-white">Swap</h1>
          <h1 className=" hover:cursor-pointer hover:text-white">Tokens</h1>
          <h1 className=" hover:cursor-pointer hover:text-white">Pools</h1>
        </div>
        <div className="  w-1/4 flex flex-col gap-4 items-center text-gray-200 p-8">
          <h1 className="text-xl font-semibold">Protocol</h1>
          <h1 className=" hover:cursor-pointer hover:text-white">Community</h1>
          <h1 className=" hover:cursor-pointer hover:text-white">Governance</h1>
          <h1 className=" hover:cursor-pointer hover:text-white">Developers</h1>
        </div>
        <div className="  w-1/4 flex flex-col gap-4 items-center text-gray-200 p-8">
          <h1 className="text-xl font-semibold">Company</h1>
          <h1 className=" hover:cursor-pointer hover:text-white">Careers</h1>
          <h1 className=" hover:cursor-pointer hover:text-white">Blog</h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
