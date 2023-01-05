import "../styles/globals.css";
import { ChainId } from "@thirdweb-dev/react";
import { Avalanche, DAppProvider, Hardhat, Localhost } from "@usedapp/core";
import DexProvider from "../components/useContext/context";
import { getDefaultProvider } from "ethers";

const config = {
  // autoConnect: true,
  readOnlyChainId: ChainId.Hardhat,
  readOnlyUrls: {
    31337: "http://localhost:8545",
  },
};

// const config = {
//   readOnlyChainId: 1337,
//   readOnlyUrls: {
//     [1337]: getDefaultProvider(),
//   },
// };

// const config = {
//   autoConnect: true,
//   readOnlyChainId: ChainId.Localhost,
//   readOnlyUrls: {
//     1337: "http://localhost:8545",
//   },
//   gasLimitBufferPercentage: 10,
// };

export default function App({ Component, pageProps }) {
  return (
    <DexProvider>
      <DAppProvider
        config={{
          networks: [Avalanche, Localhost, Hardhat],
          readOnlyChainId: ChainId.Hardhat,
          readOnlyUrls: {
            [ChainId.Avalanche]: "https://api.avax.network/ext/bc/C/rpc",
            [ChainId.Localhost]: "http://localhost:8545",
            [ChainId.Hardhat]: "http://localhost:8545",
          },
        }}
      >
        <Component {...pageProps} />
      </DAppProvider>
    </DexProvider>
  );
}
