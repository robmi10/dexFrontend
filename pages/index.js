import { LiquidationAdd } from "../components/liquidation/liquidationadd";
import { LiquidationRemove } from "../components/liquidation/liquidationRemove";
import { Navbar } from "../components/navbar";
import { Swap } from "../components/swap";
import Web3CreatePool from "../components/web3/usecreatepool";

export default function Home() {
  // const { usePool } = Web3CreatePool();

  return (
    <>
      <Navbar />
      <div className="flex items-center w-full flex-col gap-4">
        <div className="bg-blue-600 w-3/4 p-4 text-white flex flex-col items-center gap-20">
          <h1>DEX</h1>
          <button
            onClick={() => {
              // usePool();
            }}
            className="h-10 flex items-center p-4 border-2 border-green-500 hover:bg-green-500 rounded-full"
          >
            CREATE POOL
          </button>
        </div>
        {/* 
        <LiquidationApprove /> */}
        <LiquidationAdd />
        <LiquidationRemove />
        <Swap />
      </div>
    </>
  );
}
