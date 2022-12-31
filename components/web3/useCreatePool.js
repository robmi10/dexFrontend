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

  const {
    state: createStatus,
    send: createPool,
    events: createEvents,
  } = useContractFunction(dexAddressContract, "createPool");

  useEffect(() => {
    console.log({ createStatus: createStatus.status });

    if (createStatus.status === "Success") {
      console.log({ createEvents });

      console.log({
        createEventsIDSecond: createEvents[0]?.args?._id.toString(),
      });
      console.log({ createStatus });

      setCreatePoolStatus({
        createdId: createEvents[0]?.args._createBy,
        createdBy: createEvents[0]?.args._id.toString(),
        createdToken: createEvents[0]?.args._token,
      });
    }
  }, [createStatus]);

  const usePool = async () => {
    createPool(daiAddress);
  };
  return { usePool };
};
export default Web3CreatePool;
