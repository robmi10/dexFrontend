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

  const createProposal = async () => {
    try {
      await fetch("api/db/createPool", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //   proposeTitle: proposal.proposeTitle,
          //   proposer: proposal.proposerAddr,
          //   proposeId: proposal.proposalId,
          //   proposeStatus: true,
          //   time: Date.now(),
        }),
      }).then(() => {
        getProposal();
      });
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <DexProvider.Provider
      value={{
        createPoolStatus,
        setCreatePoolStatus,
      }}
    >
      {children}
    </DexProvider.Provider>
  );
};

export default DexProvider;
