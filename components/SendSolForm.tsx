import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { FC, useState } from 'react'
import styles from '../styles/Home.module.css'
import { Transaction, SystemProgram, PublicKey, LAMPORTS_PER_SOL, sendAndConfirmTransaction } from "@solana/web3.js"


export const SendSolForm: FC = () => {
	const { connection } = useConnection();
	const { publicKey, sendTransaction } = useWallet();
	const [receiver, setReceiver] = useState("")
	const [amount, setAmount] = useState("")
	const [balance, setBalance] = useState("")

	const sendSol = async (event) => {
		event.preventDefault()
		console.log(publicKey?.toBase58);
		const recepient = new PublicKey(receiver);
		const transaction = new Transaction();
		const instruction = SystemProgram.transfer({
			fromPubkey: publicKey,
			toPubkey: recepient,
			lamports: LAMPORTS_PER_SOL * Number(amount),
		});
		transaction.add(instruction);
		connection.getLatestBlockhash('finalized')
		// assuming you have a transaction named `transaction` already
		const blockhashResponse = await connection.getLatestBlockhashAndContext();
		const lastValidBlockHeight = blockhashResponse.context.slot + 150;
		const rawTransaction = transaction.serialize();
		let blockheight = await connection.getBlockHeight();

		while (blockheight < lastValidBlockHeight) {
			sendTransaction(transaction, connection, { maxRetries: 5 });
			blockheight = await connection.getBlockHeight();
		}
		const signature = await sendTransaction(transaction, connection, { maxRetries: 5 });
		setAmount("")
		console.log(`Explorer URL: https://explorer.solana.com/tx/${signature}?cluster=mainnet-beta`);

	}

	const checkBalance = async (e) => {
		e.preventDefault();
		const rKey = new PublicKey(receiver)
		const b = (await connection.getBalance(rKey)) / LAMPORTS_PER_SOL;
		setBalance(b.toString())
	}

	return (
		<div className={styles.container}>
			<form onSubmit={sendSol} className={styles.form}>
				<label htmlFor='recipient'>Send SOL to:</label>
				<input
					value={receiver}
					id='recipient'
					type='text'
					onChange={(e) => setReceiver(e.target.value)}
					className={styles.formField}
					placeholder='e.g. 4Zw1fXuYuJhWhu9KLEYMhiPEiqcpKd6akw3WRZCv84HA'
					required
				/>

				{receiver && <div>
					<h3>Check Receiever:<span className={styles.receiver}>{receiver}</span> Balance</h3>
					<p>{balance}</p>
					<button onClick={checkBalance}>Receiver Balance</button>
				</div>}
				<label htmlFor='amount'>Amount (in SOL) to send:</label>
				<input
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					type='text'
					className={styles.formField}
					placeholder='e.g. 0.1'
					required
				/>
				<br />
				<button type='submit' className={styles.formButton}>
					Send
				</button>
			</form>
		</div>
	);
}