import React from "react";
import { createContext, useState, useEffect } from "react";
export const DexContext = createContext();
// import { client } from "../../sanityclient/sanity";

const DexProvider = ({ children }) => {
  const [createPoolStatus, setCreatePoolStatus] = useState(false);

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

  return (
    <DexContext.Provider
      value={{
        createPoolStatus,
        setCreatePoolStatus,
      }}
    >
      {children}
    </DexContext.Provider>
  );
};

export default DexProvider;
