import "../styles/globals.css";
import { ChainId } from "@thirdweb-dev/react";
import { DAppProvider } from "@usedapp/core";

const config = {
  autoConnect: true,
  readOnlyChainId: ChainId.Hardhat,
  readOnlyUrls: {
    31337: "http://localhost:8545",
  },
};

export default function App({ Component, pageProps }) {
  return (
    <DAppProvider config={config}>
      <Component {...pageProps} />
    </DAppProvider>
  );
}
