import React from "react";
import { createContext, useState, useEffect } from "react";
export const DexContext = createContext();
// import { client } from "../../sanityclient/sanity";

const DexProvider = ({ children }) => {
  const [createPoolStatus, setCreatePoolStatus] = useState(false);
  const [approveStatus, setCreateApproveStatus] = useState(false);
  const [liquidityStatus, setliquidityStatus] = useState(false);

  //   useEffect(() => {
  //     if (!voteList) {
  //       getVote();
  //     }
  //   });

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

  const createPool = async () => {
    console.log({ createPoolStatus });
    try {
      await fetch("api/db/createPool", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          createdId: createPoolStatus.createdId,
          createdBy: createPoolStatus.createdBy,
          createdToken: createPoolStatus.createdToken,
        }),
      }).then(() => {});
    } catch (error) {
      console.log({ error });
    }
  };

  const addLiquidity = async () => {
    console.log({ liquidityStatus });
    try {
      await fetch("api/db/addLiquidity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          liquidityid: liquidityStatus.liquidityid,
          liquidityowner: liquidityStatus.liquidityowner,
          amount: liquidityStatus.amount,
          token: liquidityStatus.token,
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
      }}
    >
      {children}
    </DexContext.Provider>
  );
};

export default DexProvider;
