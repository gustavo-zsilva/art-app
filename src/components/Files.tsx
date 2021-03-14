import { useState, useEffect } from 'react';

import styles from '../styles/components/Files.module.css';
import experienceStyles from '../styles/components/ExperienceBar.module.css';

import axios, { AxiosRequestConfig } from 'axios';

import Dropzone from 'react-dropzone';
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';

import { uniqueId } from 'lodash';
import filesize from 'filesize';

import Cookies from 'js-cookie';


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

    // To avoid triggering react hooks re-rendering every time, here I use
    // a traditional array to make these changes, just to concat these to
    // the "User View" in the end of the cicle.
    let hiddenFilesArray = [];

    const experienceEarned = uploadedFiles.length * 10;
    const maxExperience = 100;
    let experiencePercentage = (100 * experienceEarned) / maxExperience;

    useEffect(() => {
        if (uploadedFiles.length <= 0) return;

        Cookies.set('uploadedFiles', JSON.stringify(uploadedFiles));
    }, [uploadedFiles])
    

    async function processUpload(uploadedFile: FileProps) {

        const data = new FormData();

        data.append('artFiles', uploadedFile.file);

        const config: AxiosRequestConfig = {

            // Every time there's a change on the upload progress on the server side,
            // this function returns an "progressEvent" object where we can get the actual progress
            // of the file upload. (Axios)
            onUploadProgress: (progressEvent) => {
                const percentageProgress = Math.round((100 * progressEvent.loaded) / progressEvent.total);
                
                uploadedFile.progress = percentageProgress;
                setUploadedFiles([...uploadedFiles, uploadedFile]);
            },
        }

        // Send the request to the server (actually upload the file)
        await axios.post('/api/upload', data, config)
            .then(res => {
                if (!res.data.success) return;

                uploadedFile.uploaded = true;
                
                const fileIndex = hiddenFilesArray.indexOf(uploadedFile);
                hiddenFilesArray[fileIndex] = uploadedFile;
                
            })
            .catch(err => {
                uploadedFile.error = true;

                const index = hiddenFilesArray.indexOf(uploadedFile);
                hiddenFilesArray[index] = uploadedFile;
                
                console.error(err);
            })

        setUploadedFiles(uploadedFiles.concat(hiddenFilesArray));
    }

    

    async function previewFiles(files) {

        const newFileUploads: FileProps[] = Array
            .from(files)
            .map((file: File) => ({
                file,
                id: uniqueId(),
                name: file.name,
                readableSize: filesize(file.size),
                preview: URL.createObjectURL(file),
                progress: 0,
                uploaded: false,
                error: false,
                url: null,
            }))

        
        hiddenFilesArray = hiddenFilesArray.concat(newFileUploads);
        setUploadedFiles(uploadedFiles.concat(newFileUploads));
        
        newFileUploads.forEach((uploadedFile: FileProps) => processUpload(uploadedFile));
    }

    function deleteFileFromList(fileToDelete: FileProps) {
        const updatedUploadedFiles = uploadedFiles.filter(file => file !== fileToDelete);

        setUploadedFiles(updatedUploadedFiles);
    }

    function handleDeleteAllFiles() {
        setUploadedFiles([]);
    }

    function renderDragMessage(isDragActive: boolean, isDragReject: boolean) {
        if (isDragReject) {
            return <p>Tipo de arquivo não suportado.</p>
        } else if (isDragActive) {
            return <p>Solte seus arquivos aqui!</p>
        }

        return <p>Arraste seus arquivos para cá.</p>
    }


    return (
        <div className={styles.filesContainer}>
            <form
                encType="multipart/form-data"
            >
                <div className={styles.dropzoneWrapper}>
                    <Dropzone
                        accept="image/*"
                        onDropAccepted={previewFiles}
                        
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

                        {uploadedFiles.map((file: FileProps) => (
                            <li key={file.id}>

                                <div>
                                    <div className={styles.image} style={{ backgroundImage: `url(${file.preview})` }} />
                                    
                                    <div className={styles.fileInfo}>
                                        <strong>{file.name}</strong>
                                        <span>{file.readableSize}
                                            {file.uploaded && <button type="button" onClick={() => deleteFileFromList(file)}>Excluir</button>}
                                        </span>
                                    </div>
                                </div>
                                
                                <div>
                                    { !!file.url && (
                                        <button type="button" className={styles.link}>
                                            <MdLink size={24} />
                                        </button>
                                    ) }
                                    
                                    {file.progress !== 100 && <CircularProgressbar
                                        styles={{
                                            root: { width: 24 },
                                            path: { stroke: '#7159c1' }
                                        }}
                                        strokeWidth={10}
                                        value={file.progress}
                                    />}

                                    {file.uploaded && <MdCheckCircle size={24} color="#6FDFD1" />}

                                    {file.error && <MdError size={24} color="#e57878" />}
                                </div>
                            </li>
                        ))}
                        
                        {uploadedFiles.length > 0 && (
                            <div className={styles.buttonContainer}>
                                <button id="finish">Concluir</button>
                                <button id="delete" onClick={handleDeleteAllFiles}>Excluir tudo</button>
                            </div>
                        )}

                    </ul>
                </div>
            </form>
            
            <div className={styles.experienceStatus}>
                <h3>Experiência a ganhar:</h3>
                <div className={experienceStyles.experienceBarContainer}>
                    <span>0 xp</span>
                    <div>
                        <div style={{ width: `${experiencePercentage > maxExperience ? experiencePercentage = 100 : experiencePercentage}%` }} />
                        <span
                            className={experienceStyles.currentExperience}
                            style={{ left: `${experiencePercentage > maxExperience ? '100' : experiencePercentage}%` }}
                        >
                            {experienceEarned} xp
                        </span>
                    </div>
                    <span>{maxExperience} xp</span>
                </div>
            </div>
        </div>
    );
}