import React from "react";
import { createContext, useState, useEffect } from "react";
import { client } from "../../sanityClient/client";
export const DexContext = createContext();

const DexProvider = ({ children }) => {
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
  const [tokenlist, setTokenList] = useState(false);
  const [activeToken, setActiveToken] = useState(0);
  const [toastNotifcation, setToastNotifcation] = useState(0);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (!tokenlist) {
      getTokenList();
    }
  });

  const getTokenList = async () => {
    const queryTokenTable = '*[_type=="TokenTable"]';
    try {
      await client.fetch(queryTokenTable).then((res) => {
        setTokenList(res);
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const getPoolList = async () => {
    const queryPoolTable = '*[_type=="poolTable"]';
    try {
      await client.fetch(queryPoolTable).then((res) => {
        setPoolList(res);
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const createPool = async () => {
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
          tokenId: createPoolStatus.tokenId,
          ethPair: createPoolStatus.ethPair,
        }),
      }).then(() => {
        setToastNotifcation({
          type: "create",
          createdBy: createPoolStatus.createdBy,
          pool: liquidityStatus.lpaddress,
          tokenPair: createPoolStatus.tokenPair,
          time: Date.now(),
        });
        getPoolList();
        getTokenList();
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const addLiquidity = async () => {
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
        setToastNotifcation({
          type: "add",
          provider: liquidityStatus.liquidityowner,
          amount: liquidityStatus.ethamount,
          pool: liquidityStatus.liquidityid,
          token: liquidityStatus.tokenPair,
          time: Date.now(),
        });
        getPoolList();
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const removeLiquidity = async () => {
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
        setToastNotifcation({
          type: "remove",
          provider: liquidityRemoveStatus.liquidityowner,
          amount: liquidityRemoveStatus.ethamount,
          pool: liquidityRemoveStatus.liquidityid,
          token: liquidityRemoveStatus.tokenPair,
          time: Date.now(),
        });
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
        tokenlist,
        setTokenList,
        activeToken,
        setActiveToken,
        setToastNotifcation,
        toastNotifcation,
        loading,
        setLoading,
      }}
    >
      {children}
    </DexContext.Provider>
  );
};

export default DexProvider;
