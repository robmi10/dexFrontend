import React, { useContext, useEffect, useState } from "react";
import { DexContext } from "../useContext/context";
import { AiOutlineClose } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import btc from "../svg/btc.svg";
import eth from "../svg/eth.svg";
import sol from "../svg/sol.svg";
import Image from "next/image";

const Modal = () => {
  const { modal, setModal, setActivePool } = useContext(DexContext);
  const [searchInput, setSearchInput] = useState(false);

  useEffect(() => {
    console.log({ modalCheck: modal });
  }, [modal]);

  const TestList = [
    { token: "ETH", img: eth, id: 0 },
    { token: "BTC", img: btc, id: 1 },
    { token: "SOL", img: sol, id: 2 },
  ];

  const listSearch = TestList?.filter((optionToken) => {
    return !searchInput
      ? optionToken
      : optionToken?.token.toLowerCase().includes(searchInput);
  });

  return (
    <div>
      <div className="fixed h-full w-full bg-black bg-opacity-75 top-0 left-0 flex justify-center items-center z-10">
        <div className="bg-slate-900 w-1/4 h-3/4 rounded-md border border-gray-500 flex flex-col gap-12">
          <div className="h-1/3 space-y-3 p-4">
            <div className=" w-full h-1/4  flex flex-row text-gray-200 justify-between items-center">
              <h1>Select Token </h1>
              <AiOutlineClose
                className="hover:cursor-pointer hover:text-white"
                onClick={() => {
                  setModal(false);
                }}
              />
            </div>
            <div className=" w-full h-1/4 flex flex-row text-white justify-between items-center">
              <div className="w-full h-full relative ">
                <div className=" absolute h-full w-2/12 flex justify-center items-center ">
                  <BsSearch size={25} />
                </div>
                <input
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                  }}
                  className="pl-14 block text-lg h-full w-full rounded-lg bg-slate-800 "
                />
              </div>
            </div>

            <div className=" text-white items-center">
              <div className="w-full h-auto flex flex-wrap gap-4">
                {TestList.map((option) => {
                  return (
                    <button className="flex flex-row items-center border hover:bg-gray-700 border-gray-700 p-4 rounded-full w-4/12  gap-4 h-12">
                      <Image src={option.img} className="h-8 w-8" />
                      <h1>{option.token}</h1>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="w-full h-2/3 overflow-auto border-t border-gray-600">
            {listSearch.map((option) => {
              return (
                <>
                  <span
                    onClick={() => {
                      setActivePool(option.id);
                      setModal(false);
                    }}
                    className="flex flex-row items-center text-white hover:bg-gray-700 p-4 w-full gap-4 h-12 hover:cursor-pointer"
                  >
                    <Image src={option.img} className="h-8 w-8" />
                    <h1>{option.token}</h1>
                  </span>
                </>
              );
            })}
          </div>
        </div>
      </div>
      {/* {modal === "vote" && <VoteForm />}
        {modal === "propose" && <ProposalForm />} */}
    </div>
  );
};

export default Modal;
