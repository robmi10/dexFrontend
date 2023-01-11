import React, { useContext, useEffect, useState } from "react";
import { DexContext } from "../useContext/context";
import { AiOutlineClose } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../sanityClient/client";

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

const ModalToken = () => {
  const {
    modal,
    setModal,
    setActivePool,
    tokenlist,
    activePool,
    activeToken,
    setActiveToken,
  } = useContext(DexContext);
  const [searchInput, setSearchInput] = useState(false);

  useEffect(() => {
    console.log({ modalCheck: modal });
  }, [modal, activePool]);

  if (!tokenlist) return false;
  const listSearch = tokenlist?.filter((optionToken) => {
    return !searchInput
      ? optionToken
      : optionToken?.Token.toLowerCase().includes(searchInput);
  });

  console.log({ listSearch });
  const latestTokenFilter = tokenlist.slice(0, 4);
  const tokenPair = tokenlist[activePool];

  return (
    <div>
      <div className="fixed h-full w-full bg-black bg-opacity-75 top-0 left-0 flex justify-center items-center z-10">
        <div className="bg-slate-900 w-1/4 h-3/4 rounded-md border border-gray-500 flex flex-col gap-12">
          <div className="h-1/3 space-y-3 p-4">
            <div className=" w-full h-1/4  flex flex-row text-gray-200 justify-between items-center">
              <h1>Select Token Create</h1>
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

            <div className="text-white items-center">
              <div className="w-full h-auto flex flex-wrap gap-4">
                {latestTokenFilter?.map((option) => {
                  return (
                    <button className="flex flex-row items-center border hover:bg-gray-700 border-gray-700 p-4 rounded-full w-4/12  gap-4 h-12">
                      <img
                        className="w-8 h-8"
                        src={urlFor(option.TokenImage)}
                      />
                      <h1>{option.Token}</h1>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="w-full h-2/3  overflow-auto border-t border-gray-600 flex gap-6 flex-col">
            {listSearch?.map((option) => {
              return (
                <>
                  {option.TokenStatus && (
                    <button
                      disabled
                      onClick={() => {
                        setActiveToken(option.TokenId);
                        setModal(false);
                        console.log({ currentiD: option.TokenId });
                      }}
                      className="flex flex-row h-16 items-center text-white hover:bg-gray-700 p-4 w-full gap-4 hover:cursor-pointer"
                    >
                      <img
                        className="w-8 h-8"
                        src={urlFor(option.TokenImage)}
                      />
                      <h1>{option.Token}</h1>
                    </button>
                  )}
                  {!option.TokenStatus && (
                    <button
                      onClick={() => {
                        setActiveToken(option.TokenId);
                        setModal(false);
                        console.log({ currentiD: option.TokenId });
                      }}
                      className="flex opacity-20 flex-row h-16 items-center text-white hover:bg-gray-700 p-4 w-full gap-4 hover:cursor-pointer"
                    >
                      <img
                        className="w-8 h-8"
                        src={urlFor(option.TokenImage)}
                      />
                      <h1>{option.Token}</h1>
                    </button>
                  )}
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalToken;
