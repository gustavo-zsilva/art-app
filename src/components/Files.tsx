import { useState } from 'react';

import styles from '../styles/components/Files.module.css';

import axios, { AxiosRequestConfig } from 'axios';

import Dropzone from 'react-dropzone';
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';

import { uniqueId } from 'lodash';
import filesize from 'filesize';

interface FileProps {
    file: File,
    id: string,
    name: string,
    readableSize: string,
    preview: string,
    progress: number,
    uploaded: boolean,
    error: boolean,
    url: string,
}

export function Files() {

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isFileUploaded, setIsFileUploaded] = useState(false);

    async function sendFileToServer(file) {
        const config: AxiosRequestConfig = {
            onUploadProgress: (progressEvent) => {
                const percentageProgress = (100 * progressEvent.loaded) / file.size;

                setUploadProgress(percentageProgress);
            },
        }

        const response = await axios.post('/api/upload', file, config);

        return response.data;
    }

    function renderDragMessage(isDragActive: boolean, isDragReject: boolean) {
        if (isDragReject) {
            return <p>Tipo de arquivo não suportado.</p>
        } else if (isDragActive) {
            return <p>Solte seus arquivos aqui!</p>
        }

        return <p>Arraste seus arquivos para cá.</p>
    }

    async function previewFiles(files: FileList) {

        

        const filesArray: FileProps[] = Array
            .from(files)
            .map((file: File) => ({
                file,
                id: uniqueId(),
                name: file.name,
                readableSize: filesize(file.size),
                preview: URL.createObjectURL(file),
                progress: uploadProgress,
                uploaded: isFileUploaded,
                error: false,
                url: null,
            }))

        setUploadedFiles(uploadedFiles.concat(filesArray));
        

        const response = sendFileToServer(files);

        if (uploadProgress === 100) {
            setIsFileUploaded(true);
        } else if (uploadProgress !== 100) {
            
        }
        
    }

    return (
        <div className={styles.publishContainer}>
            <form
                encType="multipart/form-data"
            >
                <div className={styles.dropzoneWrapper}>
                    <Dropzone
                        accept="image/*"
                        onDropAccepted={previewFiles}
                        
                        multiple
                    >
                        { ({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                            <div
                                {...getRootProps()}
                                className={styles.dropzoneContainer}
                                style={isDragReject ? {borderColor: '#e57878'} : isDragActive ? {borderColor: '#78e5d5'} : null}
                            >
                                {renderDragMessage(isDragActive, isDragReject)}
                                <input {...getInputProps()} />
                            </div>
                        ) }
                    </Dropzone>

                    <ul className={styles.progressPanel}>

                        {uploadedFiles.map(file => (
                            <li key={file.id}>

                                <div>
                                    <div className={styles.image} style={{ backgroundImage: `url(${file.preview})` }} />
                                    
                                    <div className={styles.fileInfo}>
                                        <strong>{file.name}</strong>
                                        <span>{file.readableSize} <button type="button">Excluir</button></span>
                                    </div>
                                </div>
                                
                                <div>
                                    <button type="button" className={styles.link}>
                                        <MdLink size={24} />
                                    </button>
                                    
                                    
                                    {file.uploaded ? <MdCheckCircle size={24} color="green" /> : (
                                        <CircularProgressbar
                                            styles={{
                                                root: { width: 24 },
                                                path: { stroke: '#7159c1' }
                                            }}
                                            strokeWidth={10}
                                            value={file.progress}
                                        />
                                    )}
                                    
                                    {file.error && <MdError size={24} color="#e57878" />}
                                    

                                </div>
                            </li>
                        ))}
                        
                    </ul>
                </div>
            </form>

        </div>
    );
}