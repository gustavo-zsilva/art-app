import Head from 'next/head';

import { RecentArts } from '../components/RecentArts';
import { Layout } from '../components/Layout';

import axios from 'axios';

import styles from '../styles/pages/Gallery.module.css';
import { ImagesProvider } from '../contexts/ImagesContext';

interface RecentProps {
  data: {
    success: boolean,
    data: [],
  }
}

export default function Gallery(props: RecentProps) {
  return (
    <ImagesProvider imageData={props.data}>
    <Layout>

      <Head>
        <title>Art App | Início</title>
      </Head>

      <div className={styles.galleryContainer}>

        <RecentArts />

      </div>
      
    </Layout>
    </ImagesProvider>
  )
}

export const getServerSideProps = async () => {
  const response = await axios.get('http://localhost:3000/api/upload');

  return {
    props: {
      data: response.data
    }
  }
}
