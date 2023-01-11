import React, { useContext, useEffect, useRef, useState } from "react";
import { useEthers, useContractFunction } from "@usedapp/core";
import dexInfo from "../../constants/Dex.json";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { DexAddress, DaiTokenAddress } from "../../address";
import { DexContext } from "../useContext/context";

const Web3CreatePool = () => {
  const { setCreatePoolStatus } = useContext(DexContext);
  const { account } = useEthers();
  const dexAddress = DexAddress;
  const daiAddress = DaiTokenAddress;
  const dexInterface = new ethers.utils.Interface(dexInfo.abi);
  const dexAddressContract = new Contract(dexAddress, dexInterface);
  const [input, setInput] = useState(false);
  const {
    state: createStatus,
    send: createPool,
    events: createEvents,
  } = useContractFunction(dexAddressContract, "createPool");

  useEffect(() => {
    console.log({ createStatus: createStatus.status });

    if (createStatus.status === "Success") {
      const { Token, _id } = input;

      console.log({ createEvents });

      console.log({
        createEventsIDSecond: createEvents[0]?.args?._id.toString(),
      });
      console.log({ createStatus });

      setCreatePoolStatus({
        createdId: createEvents[0]?.args._id,
        createdBy: createEvents[0]?.args._createBy,
        createdToken: createEvents[0]?.args._token,
        tokenPair: Token,
        tokenId: _id,
        ethPair: "eth",
        lpaddress: "",
      });
    }
  }, [createStatus]);

  const usePool = async (data) => {
    console.log({ data });
    setInput(data);
    createPool(daiAddress);
  };
  return { usePool };
};
export default Web3CreatePool;
