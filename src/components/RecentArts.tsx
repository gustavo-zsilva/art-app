import { useContext, useState } from 'react';

import Image from 'next/image';

import { ActionsBar } from '../components/ActionsBar';
import { ImagesContext } from '../contexts/ImagesContext';

import styles from '../styles/components/RecentArts.module.css';
import Link from 'next/link';

export function RecentArts() {

    const { allImages } = useContext(ImagesContext);

    const [isMouseHovering, setMouseHovering] = useState('');

    return (
        <div className={styles.recentArtsContainer}>
            {allImages.map(image => {
                
                // Specifying only a "/", nextjs understands that we are trying to get
                // files from the "public" folder, so we can hide the 'public' in the path;
                const parsedPath = image.img.path.replace('public', '');
                const currentId = image._id;
                             
                return (
                    <Link
                        key={currentId}
                        href={`/post/${currentId}`}
                    >
                        <figure
                            onMouseOver={() => setMouseHovering(currentId)}
                            onMouseLeave={() => setMouseHovering('')}
                        >
                            <img src={parsedPath} alt=""/>
                            {isMouseHovering === currentId && <ActionsBar id={currentId} author={image.author} />}
                        </figure>
                    </Link>
                );
            })}
        </div>
    );
}