import "../styles/globals.css";
import { ChainId } from "@thirdweb-dev/react";
import { Avalanche, DAppProvider, Hardhat, Localhost } from "@usedapp/core";
import DexProvider from "../components/useContext/context";
import { getDefaultProvider } from "ethers";
import { Navbar } from "../components/navbar";
import { ChakraProvider } from "@chakra-ui/react";
import Footer from "../components/footer";

const config = {
  // autoConnect: true,
  readOnlyChainId: ChainId.Hardhat,
  readOnlyUrls: {
    31337: "http://localhost:8545",
  },
};

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <DexProvider>
        <DAppProvider
          config={{
            networks: [Localhost],
            readOnlyChainId: ChainId.Localhost,
            readOnlyUrls: {
              [ChainId.Localhost]: "http://localhost:7545",
            },
          }}
        >
          <Navbar />
          <div className="h-screen w-screen bg-indigo-900">
            <Component {...pageProps} />
          </div>
        </DAppProvider>
      </DexProvider>
    </ChakraProvider>
  );
}
