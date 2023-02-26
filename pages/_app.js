import "../styles/globals.css";
import { ChainId } from "@thirdweb-dev/react";
import {
  Avalanche,
  DAppProvider,
  Hardhat,
  Localhost,
  Mumbai,
} from "@usedapp/core";
import DexProvider from "../components/useContext/context";
import { getDefaultProvider } from "ethers";
import { Navbar } from "../components/navbar";
import { ChakraProvider } from "@chakra-ui/react";
import Footer from "../components/footer";
import Layout from "../components/layout";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <DexProvider>
        <DAppProvider
          config={{
            networks: [Mumbai],
            readOnlyChainId: 80001,
            readOnlyUrls: {
              [80001]: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_PROJECT_ID}`,
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
