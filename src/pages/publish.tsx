import Head from 'next/head';

import { Layout } from "../components/Layout";
import { Files } from '../components/Files';

import styles from '../styles/pages/Publish.module.css';

import Cookies from 'js-cookie';

export default function Publish() {
    return (
        <Layout>
            <Head>
                <title>Publish | Art App</title>
            </Head>

            <div className={styles.publishContainer}>
                <Files />
            </div>
            
        </Layout>
    )
}

export const getServerSideProps = async () => {
    const uploadedFiles = Cookies.get('uploadedFiles');

    console.log(uploadedFiles);
    

    return {
        props: {

        }
    }
}

