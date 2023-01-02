import React from "react";
import { createContext, useState, useEffect } from "react";
import { client } from "../../sanityClient/client";
export const DexContext = createContext();
// import { client } from "../../sanityclient/sanity";

const DexProvider = ({ children }) => {
  const [createPoolStatus, setCreatePoolStatus] = useState(false);
  const [approveStatus, setCreateApproveStatus] = useState(false);
  const [liquidityStatus, setliquidityStatus] = useState(false);
  const [liquidityRemoveStatus, setliquidityRemoveStatus] = useState(false);
  const [poolList, setPoolList] = useState(false);

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

    console.log({
      liquidityStatusAmount: liquidityStatus.totalamount.toString(),
    });
    try {
      await fetch("api/db/addLiquidity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          liquidityid: liquidityStatus.liquidityid,
          liquidityowner: liquidityStatus.liquidityowner,
          amount: liquidityStatus.totalamount.toString(),
          token: liquidityStatus.token,
          totalamount: liquidityStatus.totalamount,
          tokenamount: liquidityStatus.tokenamount,
          ethamount: liquidityStatus.ethamount,
          lptotalvalue: liquidityStatus.lpBalance,
          ethtotalvalue: liquidityStatus.ethBalance,
        }),
      }).then(() => {});
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
          amount: liquidityRemoveStatus.amount.toString(),
          token: liquidityRemoveStatus.token,
          totalamount: liquidityRemoveStatus.totalamount,
          tokenamount: liquidityRemoveStatus.tokenamount,
          ethamount: liquidityRemoveStatus.ethamount,
          lptotalvalue: liquidityRemoveStatus.lpBalance,
          ethtotalvalue:
            liquidityRemoveStatus.ethBalance -
            (liquidityRemoveStatus.ethBalance * liquidityRemoveStatus.amount) /
              liquidityRemoveStatus.lpBalance,
          //address(this).balance * _amount / lpToken._totalSupply()
        }),
      }).then(() => {});
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
      }}
    >
      {children}
    </DexContext.Provider>
  );
};

export default DexProvider;
