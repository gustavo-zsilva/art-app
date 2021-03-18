import { useContext } from 'react';

import Image from 'next/image';

import { ActionsBar } from '../components/ActionsBar';
import { ImagesContext } from '../contexts/ImagesContext';

import styles from '../styles/components/RecentArts.module.css';
import Link from 'next/link';

export function RecentArts() {

    const { allImages } = useContext(ImagesContext);

    return (
        <div className={styles.recentArtsContainer}>
            {allImages.map(image => {
                
                // Specifying only a "/", nextjs understands that we are trying to get
                // files from the "public" folder, so we can hide the 'public' in the path;
                const parsedPath = image.img.path.replace('public', '');
                             
                return (
                    <Link href={`/post/${image._id}`}>
                        <figure key={image._id}>
                            <img src={parsedPath} alt=""/>
                        </figure>
                    </Link>
                );
            })}
        </div>
    );
}