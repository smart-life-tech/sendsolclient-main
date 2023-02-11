import React, { useMemo } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import {
  GlowWalletAdapter,
  PhantomWalletAdapter
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

// require('../styles/globals.css');
require('../styles/Home.module.css');
require('@solana/wallet-adapter-react-ui/styles.css');
import '../styles/globals.css'
/*
var cors = require('cors');
const express = require("express");
const app = express();
app.use(cors({
  origin: "http://localhost:3000"
}));


//import  {cors} from "cors";

const express = require("express");
const app = express();
app.use(cors({
  origin: "https://sendtest.herokuapp.com"
}));*/
function MyApp({ Component, pageProps }) {
  const network = WalletAdapterNetwork.Mainnet;
  
  // const endpoint = useMemo(()=> clusterApiUrl(network), [network]);
  const endpoint = useMemo(() => " https://solana-api.syndica.io/access-token/r6O32Ot8TFT1PhXbGvPNXNWumRbAZzhz5KOHp9ShLhG2v1yBrbefycT2frWlxEqz/rpc/", [network]);
 //const endpoint = useMemo(() => {const corsUrl = "https://cors-anywhere.herokuapp.com/";
 //return `${corsUrl}https://solana-api.projectserum.com`;
//}, [network]);

 const wallets = useMemo(() => [
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
