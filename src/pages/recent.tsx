import Head from 'next/head';

import { Recent as RecentComponent } from '../components/RecentArts';
import { Layout } from '../components/Layout';

import styles from '../styles/pages/Recent.module.css';

export default function Recent() {
  return (
    <Layout>
      <div className={styles.recentContainer}>
        <Head>
          <title>Art App | Início</title>
        </Head>

        <RecentComponent />

      </div>
    </Layout>

  )
}
