import React, { useContext, useEffect, useRef, useState } from "react";
import { useEthers, useContractFunction } from "@usedapp/core";
import daiInfo from "../../constants/DAI.json";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { DexAddress, DaiTokenAddress } from "../../address";
import { DexContext } from "../useContext/context";

const Web3Approve = () => {
  const { approveStatus, setCreateApproveStatus } = useContext(DexContext);
  const { account } = useEthers();
  const daiAddress = DaiTokenAddress;
  const dexAddress = DexAddress;
  const daiInterface = new ethers.utils.Interface(daiInfo.abi);
  const daiAddressContract = new Contract(daiAddress, daiInterface);

  const {
    state: approveState,
    send: approveContract,
    events: approveEvents,
  } = useContractFunction(daiAddressContract, "approve");

  useEffect(() => {
    console.log({ approveState });

    if (approveState.status === "Success") {
      console.log({
        approveEvents: approveEvents,
      });
      console.log({ approveEvents });
      console.log({ approveState });
    }
  }, [approveState]);

  const useApprove = async (data) => {
    console.log({ data });
    const { liquidityPool, liquidityAdd } = data;
    approveContract("0x8EFa1819Ff5B279077368d44B593a4543280e402", liquidityAdd);
  };
  return { useApprove };
};
export default Web3Approve;
