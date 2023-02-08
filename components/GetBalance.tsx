import React from 'react'
import {useConnection, useWallet} from "@solana/wallet-adapter-react"

const GetBalance = () => {
  const {connection }= useConnection();
  const {publicKey, sendTransaction} = useWallet() ;
  
  return (
    <div>GetBalance</div>
  )
}

export default GetBalance