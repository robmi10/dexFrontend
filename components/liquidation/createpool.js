import React, { useContext, useEffect } from "react";
import { DexContext } from "../useContext/context";
import Web3CreatePool from "../web3/usecreatepool";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../sanityClient/client";
import { useToast } from "@chakra-ui/toast";
import SquareLoader from "../animation/square/square";

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

const Createpool = () => {
  const {
    tokenlist,
    setModal,
    activeToken,
    toastNotifcation,
    setToastNotifcation,
    setLoading,
    loading,
  } = useContext(DexContext);
  const { usePool } = Web3CreatePool();
  const toast = useToast();
  useEffect(() => {
    if (toastNotifcation) {
      toastNotifcation.type === "create" &&
        toast({
          title: "Create Pool",
          description: `${toastNotifcation.createdBy} created pool ${toastNotifcation.pool}\n With Token Pair ${toastNotifcation.tokenPair}/ETH]}.`,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      setToastNotifcation(false);
      setLoading(false);
    }
  }, [toastNotifcation]);

  useEffect(() => {}, [activeToken, loading]);

  const createPool = (value) => {
    usePool(value);
  };

  if (!tokenlist) return false;
  const tokenPair = tokenlist.filter(
    (option) => option.TokenId === activeToken
  );

  const isActive = activeToken !== false;

  return (
    <div className="flex h-full w-full flex-col gap-4 justify-center items-center">
      <div className="md:w-2/4 gap-1 h-2/3 text-white flex flex-col items-center  ">
        <div className="w-full h-1/5  justify-between flex items-center p-4">
          <h1 className=" text-3xl">Pools</h1>
          <div className=" flex flex-row items-center rounded-full border  border-gray-700 bg-slate-900 p-2 hover:cursor-pointer">
            <h1 className="text-xs ">More</h1>
            <MdOutlineKeyboardArrowDown size={20} />
          </div>
        </div>

        <div className=" bg-slate-900 w-full h-2/3 rounded-3xl border animate-fade border-gray-600 justify-center items-center flex">
          <div className="space-y-5 flex items-center flex-col p-2 md:p-0">
            <label>TOKEN</label>
            <div className="h-24 flex w-80 relative">
              {!isActive && (
                <button
                  onClick={() => {
                    setModal("token");
                  }}
                  className="h-3/5 md:h-16 w-full bg-blue-600 text-xl text-white rounded-full flex flex-row justify-center items-center gap-2"
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
                  className="h-16 w-full md:h-full border border-gray-400 right-2 bg-slate-800 text-xl text-gray-400 rounded-full top-1/4 flex flex-row justify-center items-center gap-3"
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
              onClick={() => {
                createPool(tokenPair[0]);
              }}
              className="w-full h-16 justify-center mt-2 md:h-20 flex items-center border-2 bg-slate-900 hover:text-indigo-900 hover:bg-white hover:cursor-pointer hover:duration-300  rounded-full"
            >
              {loading ? <SquareLoader square={true} /> : <h1>Create Pool</h1>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Createpool;
