import React, { useContext, useEffect, useRef, useState } from "react";
import { useEthers, useContractFunction } from "@usedapp/core";
import dexInfo from "../../constants/Dex.json";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { DexAddress, DaiTokenAddress } from "../../address";
import { DexContext } from "../useContext/context";

const Web3SwapEth = () => {
  const { createPoolStatus, setCreatePoolStatus } = useContext(DexContext);
  const { account } = useEthers();
  const dexAddress = DexAddress;
  const daiAddress = DaiTokenAddress;
  const dexInterface = new ethers.utils.Interface(dexInfo.abi);
  const dexAddressContract = new Contract(dexAddress, dexInterface);

  const {
    state: swapFromEthStatus,
    send: dexSwapEthToToken,
    events: swapFromEthEvents,
  } = useContractFunction(dexAddressContract, "_swapEthToToken");

  useEffect(() => {
    console.log({ swapFromEthStatus: swapFromEthStatus.status });

    if (swapFromEthStatus.status === "Success") {
      console.log({ swapFromEthEvents });

      console.log({
        swapFromEthEventsIDSecond: swapFromEthEvents[0]?.args?._id.toString(),
      });
      console.log({ swapFromEthStatus });

      // setCreatePoolStatus({
      //   createdId: swapFromEthEvents[0]?.args._createBy,
      //   createdBy: swapFromEthEvents[0]?.args._id.toString(),
      //   createdToken: swapFromEthEvents[0]?.args._token,
      // });
    }
  }, [swapFromEthStatus]);

  const useSwapEth = async ({ input }) => {
    console.log({ input });
    dexSwapEthToToken(daiAddress);
  };
  return { useSwapEth };
};
export default Web3SwapEth;
