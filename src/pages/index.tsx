import Head from 'next/head';

import { Header } from '../components/Header';
import { Tabs } from '../components/Tabs';
import { Recent } from '../components/Recent';

import styles from '../styles/pages/Home.module.css';

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <Head>
        <title>Art App | Início</title>
      </Head>

      <Header />

      <Recent />
      
      <Tabs />
    </div>
  )
}
