import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { Layout } from "../components/Layout";
import { Files } from '../components/Files';

import styles from '../styles/pages/Publish.module.css';
import { FilesProvider } from '../contexts/FilesContext';

interface PublishProps {
    uploadedFiles: [],
}

export default function Publish(props: PublishProps) {
    return (
        <FilesProvider uploadedFiles={props.uploadedFiles}>
        <Layout>
            <Head>
                <title>Publish | Art App</title>
            </Head>

            <div className={styles.publishContainer}>
                <Files />
            </div>
            
        </Layout>
        </FilesProvider>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    // const { uploadedFiles: cookiesFiles } = context.req.cookies;
    // const stringUploadedFiles = JSON.stringify(cookiesFiles);
    // const uploadedFiles = JSON.parse(stringUploadedFiles);
    

    return {
        props: {
            // uploadedFiles,
        }
    }
}

