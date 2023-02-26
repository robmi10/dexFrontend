import { useContext, useEffect, useState } from "react";
import { useContractFunction } from "@usedapp/core";
import dexInfo from "../../constants/Dex.json";
import daiInfo from "../../constants/DAI.json";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { DexAddress, DaiTokenAddress } from "../../address";
import { DexContext } from "../useContext/context";

const Web3CreatePoolRemove = () => {
  const { setliquidityRemoveStatus, setLoading } = useContext(DexContext);
  const daiAddress = DaiTokenAddress;
  const dexAddress = DexAddress;
  const dexInterface = new ethers.utils.Interface(dexInfo.abi);
  const dexAddressContract = new Contract(dexAddress, dexInterface);
  const daiInterface = new ethers.utils.Interface(daiInfo.abi);
  const daiAddressContract = new Contract(daiAddress, daiInterface);
  const [input, setInput] = useState(false);

  const {
    state: removeLiquidityStatus,
    send: removeLiquidity,
    events: removeLiquidityEvents,
  } = useContractFunction(dexAddressContract, "_removeLiquidity");

  const { state: daiStatus, send: approveUser } = useContractFunction(
    daiAddressContract,
    "approve"
  );

  const removeLiquidityFunc = () => {
    const { index } = input.poolInfo;
    const { liquidity } = input;

    removeLiquidity(index, liquidity, {
      value: liquidity,
    });
  };

  useEffect(() => {
    if (daiStatus.status === "Success") {
      removeLiquidityFunc();
    }

    if (daiStatus.status === "Mining") {
      setLoading(true);
    }
  }, [daiStatus]);

  useEffect(() => {
    if (removeLiquidityStatus.status === "Success") {
      const { index, address } = input.poolInfo;
      const { tokenPair } = input;

      setliquidityRemoveStatus({
        liquidityid: index,
        liquidityowner: removeLiquidityEvents[0]?.args?._from,
        amount: removeLiquidityEvents[0]?.args?._amount.toString(),
        token: daiAddress,
        lpBalance: removeLiquidityEvents[0]?.args?._lpTokenSupply.toString(),
        ethBalance: removeLiquidityEvents[0]?.args?._ethBalance.toString(),
        tokenamount: removeLiquidityEvents[0]?.args?._lpTokenBalance.toString(),
        ethamount: removeLiquidityEvents[0]?.args?._amount.toString(),
        poolAddress: address,
        lpaddress: removeLiquidityEvents[0]?.args?._lpTokenAddress.toString(),
        tokenReserve: removeLiquidityEvents[0]?.args?._tokenReserve.toString(),
        tokenPair: tokenPair[0].Token,
      });
    }
  }, [removeLiquidityStatus]);

  const PoolRemove = async (data) => {
    const { address } = data.poolInfo;
    const { liquidity } = data;
    setInput(data);
    approveUser(address, liquidity);
  };
  return { PoolRemove };
};
export default Web3CreatePoolRemove;
