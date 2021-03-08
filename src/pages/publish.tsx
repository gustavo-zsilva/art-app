import { FormEvent, useRef } from 'react';

import Head from 'next/head';
import { Layout } from "../components/Layout";
import Dropzone from 'react-dropzone';

import styles from '../styles/pages/Publish.module.css';

import axios from 'axios';

export default function Publish({ response }) {

    const fileInputRef = useRef(null);

    function handleUploadButtonClick() {
        fileInputRef.current?.click();
    }

    async function handleFormSubmit(event: FormEvent) {
        const filesToArray = [...fileInputRef.current.files];

        const data = new FormData();

        filesToArray.forEach(file => {
            data.append('artFiles', file);
        })

        const { success, error } = await sendFilesToServer(data);
    }

    async function sendFilesToServer(data: FormData) {
        const response = await axios.post('/api/upload', data);

        return response;
    }


    return (
        <Layout>
            <Head>
                <title>Publish | Art App</title>
            </Head>

            <div className={styles.publishContainer}>
                <form
                    encType="multipart/form-data"
                    onSubmit={handleFormSubmit}
                >
                    <div>
                        <button
                            type="button"
                            onClick={handleUploadButtonClick}
                        >
                            Upload Files
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            name="artFiles"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                        />
                        <button type="submit">
                            Publish
                        </button>
                        {/* <Dropzone
                            accept="image/*"
                            onDropAccepted={() => {}}
                        >
                            { ({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                                <div
                                    {...getRootProps()}
                                    className={styles.dropzoneContainer}
                                    style={isDragReject ? {borderColor: '#e57878'} : isDragActive ? {borderColor: '#78e5d5'} : null}
                                    // isDragReject={isDragReject}
                                >
                                    {renderDragMessage(isDragActive, isDragReject)}
                                    <input {...getInputProps()} />
                                </div>
                            ) }
                        </Dropzone> */}
                    </div>
                </form>

            </div>
        </Layout>
    )
}

