import { LiquidationAdd } from "../components/liquidation/liquidationadd";
import { LiquidationRemove } from "../components/liquidation/liquidationremove";
import { Navbar } from "../components/navbar";
import { Swap } from "../components/swap";
import Web3CreatePool from "../components/web3/usecreatepool";

import { useEffect, useState, useContext } from "react";

import Createpool from "../components/liquidation/createpool";

export default function Home() {
  const { usePool } = Web3CreatePool();
  const [daiBalanceCheck, setDaiBalanceCheck] = useState(false);

  return (
    <>
      <Navbar />
      <Createpool />
      <div className=" w-full flex flex-col  items-center">
        <LiquidationAdd key={1} />
        <LiquidationRemove key={2} />
        <Swap key={3} />
      </div>
    </>
  );
}
