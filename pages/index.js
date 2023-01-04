import { LiquidationAdd } from "../components/liquidation/liquidationadd";
import { LiquidationRemove } from "../components/liquidation/liquidationRemove";
import { Navbar } from "../components/navbar";
import { Swap } from "../components/swap";
import Web3CreatePool from "../components/web3/usecreatepool";
import { useTokenBalance, useEthers, useEtherBalance } from "@usedapp/core";
import { DaiTokenAddress, LiquidityTokenAddress } from "../address";

export default function Home() {
  const { account, chainId } = useEthers();
  const daiBalance = useTokenBalance(DaiTokenAddress, account);
  const liquidityBalance = useTokenBalance(LiquidityTokenAddress, account);
  const { usePool } = Web3CreatePool();
  const etherBalance = useEtherBalance(account);

  console.log({ liquidityBalance });
  console.log({ etherBalance });

  return (
    <>
      <Navbar />
      <div className="flex items-center w-full flex-col gap-4">
        <div className="bg-blue-600 w-3/4 p-4 text-white flex flex-col items-center gap-20">
          <h1>DEX</h1>

          <div>
            <span>
              <h1>Dai Balance</h1>
              <h1>{daiBalance?.toString()}</h1>
            </span>
            <span>
              <h1>LP Token Balance</h1>
              <h1>{liquidityBalance?.toString()}</h1>
            </span>
            <span>
              <h1>ETH Balance</h1>
              <h1>{etherBalance?.toString()}</h1>
            </span>
          </div>

          <button
            onClick={() => {
              usePool();
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
