import React, { useMemo } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import {
  GlowWalletAdapter,
  PhantomWalletAdapter
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
var cors = require('cors')
// require('../styles/globals.css');
require('../styles/Home.module.css');
require('@solana/wallet-adapter-react-ui/styles.css');

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const network = WalletAdapterNetwork.Mainnet;
  
  // const endpoint = useMemo(()=> clusterApiUrl(network), [network]);
  const endpoint = useMemo(() => "https://corsanywhere.herokuapp.com/https://solana-api.projectserum.com/", [network]);
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new GlowWalletAdapter()
    ],
    [network]
  )
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Component {...pageProps} />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
//MyApp.use(cors())
export default MyApp
