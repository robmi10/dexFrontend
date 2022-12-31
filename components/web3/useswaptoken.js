import React, { useContext, useEffect, useRef, useState } from "react";
import { useEthers, useContractFunction } from "@usedapp/core";
import dexInfo from "../../constants/Dex.json";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { DexAddress, DaiTokenAddress } from "../../address";
import { DexContext } from "../useContext/context";

const Web3SwapToken = () => {
  const { createPoolStatus, setCreatePoolStatus } = useContext(DexContext);
  const { account } = useEthers();
  const dexAddress = DexAddress;
  const daiAddress = DaiTokenAddress;
  const dexInterface = new ethers.utils.Interface(dexInfo.abi);
  const dexAddressContract = new Contract(dexAddress, dexInterface);

  const {
    state: swapFromTokenStatus,
    send: dexSwapTokenToEth,
    events: swapFromTokenEvents,
  } = useContractFunction(dexAddressContract, "_swapTokenToEth");

  useEffect(() => {
    console.log({ swapFromTokenStatus: swapFromTokenStatus.status });

    if (swapFromTokenStatus.status === "Success") {
      console.log({ swapFromTokenEvents });

      console.log({
        swapFromTokenEventsIDSecond:
          swapFromTokenEvents[0]?.args?._id.toString(),
      });
      console.log({ swapFromTokenStatus });

      // setCreatePoolStatus({
      //   createdId: swapFromTokenEvents[0]?.args._createBy,
      //   createdBy: swapFromTokenEvents[0]?.args._id.toString(),
      //   createdToken: swapFromTokenEvents[0]?.args._token,
      // });
    }
  }, [swapFromTokenStatus]);

  const useSwapToken = async ({ input }) => {
    console.log({ input });
    dexSwapTokenToEth(daiAddress);
  };
  return { useSwapToken };
};
export default Web3SwapToken;
