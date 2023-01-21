import "../styles/globals.css";
import { ChainId } from "@thirdweb-dev/react";
import { Avalanche, DAppProvider, Hardhat, Localhost } from "@usedapp/core";
import DexProvider from "../components/useContext/context";
import { getDefaultProvider } from "ethers";
import { Navbar } from "../components/navbar";
import { ChakraProvider } from "@chakra-ui/react";
import Footer from "../components/footer";
import Layout from "../components/layout";

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
          <Layout>
            <Navbar />
            <div className="h-screen w-screen bg-gradient-to-r from-slate-900  to-slate-700">
              <Component {...pageProps} />
            </div>
          </Layout>
        </DAppProvider>
      </DexProvider>
    </ChakraProvider>
  );
}
