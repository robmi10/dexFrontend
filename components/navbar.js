import React, { useEffect, useState } from "react";
import { useEthers } from "@usedapp/core";

export const Navbar = () => {
  const [address, setAddress] = useState(false);
  const { activateBrowserWallet, deactivate, account, error } = useEthers();
  useEffect(() => {
    console.log({ account });
    if (account) {
      setAddress(account);
    }
  }, [account]);

  return (
    <div className="flex justify-center">
      <div className="w-3/4 bg-red-400 flex h-20 flex-row justify-between rounded-md items-center p-5 text-white">
        <h1>HOME</h1>
        {account && <h1>{account?.toString()?.substr(0, 10)}</h1>}
        {!account && (
          <button onClick={activateBrowserWallet}>CONNECT WALLET</button>
        )}
        {account && (
          <button
            className="h-10 flex items-center p-4 border-2 border-green-500 hover:bg-green-500 rounded-full"
            onClick={deactivate}
          >
            DISCONNECT
          </button>
        )}
      </div>
    </div>
  );
};
