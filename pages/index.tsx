import { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { AppBar } from '../components/AppBar'
import { SendSolForm } from '../components/SendSolForm'
import GetBalance from '../components/GetBalance'
import Head from 'next/head'

const Home: NextPage = (props) => {

  return (
    <div className={styles.App}>
      <Head>
        <title>root lab Wallet</title>
        <meta
          name="description"
          content="3d root labs"
        />
      </Head>
      <AppBar />
      <div className={styles.AppBody}>
      
        <SendSolForm />
      </div>
    </div>
  );
}

export default Home;