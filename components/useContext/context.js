import { useEtherBalance, useEthers } from "@usedapp/core";
import React from "react";
import { createContext, useState, useEffect } from "react";
import { client } from "../../sanityClient/client";
export const DexContext = createContext();
// import { client } from "../../sanityclient/sanity";

const DexProvider = ({ children }) => {
  const { account } = useEthers();
  const [createPoolStatus, setCreatePoolStatus] = useState(false);
  const [approveStatus, setCreateApproveStatus] = useState(false);
  const [liquidityStatus, setliquidityStatus] = useState(false);
  const [liquidityRemoveStatus, setliquidityRemoveStatus] = useState(false);
  const [poolList, setPoolList] = useState(false);
  const [activePool, setActivePool] = useState(0);
  const [amountInput, setAmountInput] = useState(0);
  const [swapStatus, setSetSwapStatus] = useState(0);
  const [calculateEthToDai, setCalculateEthToDai] = useState(0);
  const [calculateDaiToEth, setCalculateDaiToEth] = useState(0);
  const [modal, setModal] = useState(0);

  useEffect(() => {
    if (!poolList) {
      getPoolList();
    }
  });

  useEffect(() => {
    if (createPoolStatus) {
      createPool();
    }
  }, [createPoolStatus]);

  useEffect(() => {
    if (liquidityStatus) {
      addLiquidity();
    }
  }, [liquidityStatus]);

  useEffect(() => {
    if (liquidityRemoveStatus) {
      removeLiquidity();
    }
  }, [liquidityRemoveStatus]);

  const getPoolList = async () => {
    const queryPoolTable = '*[_type=="poolTable"]';
    console.log({ queryPoolTableCheck: queryPoolTable });
    try {
      await client.fetch(queryPoolTable).then((res) => {
        console.log({ resVote: res });
        setPoolList(res);
        console.log({ poolListInsideContext: poolList });
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const createPool = async () => {
    console.log({ createPoolStatus });
    try {
      await fetch("api/db/createPool", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          createdId: createPoolStatus.createdId.toString(),
          createdBy: createPoolStatus.createdBy,
          createdToken: createPoolStatus.createdToken,
          lpaddress: createPoolStatus.lpaddress,
          tokenPair: createPoolStatus.tokenPair,
          ethPair: createPoolStatus.ethPair,
        }),
      }).then(() => {
        getPoolList();
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const addLiquidity = async () => {
    console.log({ liquidityStatus });

    // console.log({
    //   liquidityStatusAmount: liquidityStatus.totalamount.toString(),
    // });

    try {
      await fetch("api/db/addLiquidity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          liquidityid: liquidityStatus.liquidityid,
          liquidityowner: liquidityStatus.liquidityowner,
          token: liquidityStatus.token,
          totalamount: liquidityStatus.totalamount,
          tokenamount: liquidityStatus.tokenamount,
          ethamount: liquidityStatus.ethamount,
          lptotalvalue: liquidityStatus.lpBalance,
          ethtotalvalue: liquidityStatus.ethBalance,
          lpaddress: liquidityStatus.lpaddress,
          tokenReserve: liquidityStatus.tokenReserve,
        }),
      }).then(() => {
        getPoolList();
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const removeLiquidity = async () => {
    console.log({ liquidityRemoveStatus });
    try {
      await fetch("api/db/removeLiquidity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          liquidityid: liquidityRemoveStatus.liquidityid,
          liquidityowner: liquidityRemoveStatus.liquidityowner,
          token: liquidityRemoveStatus.token,
          totalamount: liquidityRemoveStatus.totalamount,
          tokenamount: liquidityRemoveStatus.tokenamount,
          ethamount: liquidityRemoveStatus.ethamount,
          lptotalvalue: liquidityRemoveStatus.lpBalance,
          ethtotalvalue: liquidityRemoveStatus.ethBalance,
          lpaddress: liquidityRemoveStatus.lpaddress,
          tokenReserve: liquidityStatus.tokenReserve,
        }),
      }).then(() => {
        getPoolList();
      });
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <DexContext.Provider
      value={{
        createPoolStatus,
        setCreatePoolStatus,
        approveStatus,
        setCreateApproveStatus,
        liquidityStatus,
        setliquidityStatus,
        liquidityRemoveStatus,
        setliquidityRemoveStatus,
        poolList,
        setPoolList,
        activePool,
        setActivePool,
        swapStatus,
        setSetSwapStatus,
        calculateEthToDai,
        setCalculateEthToDai,
        calculateDaiToEth,
        setCalculateDaiToEth,
        amountInput,
        setAmountInput,
        modal,
        setModal,
      }}
    >
      {children}
    </DexContext.Provider>
  );
};

export default DexProvider;
