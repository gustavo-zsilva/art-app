import Image from 'next/image';
import { useContext } from 'react';
import { ImagesContext } from '../contexts/ImagesContext';

import styles from '../styles/components/ActionsBar.module.css';

interface ActionsBarProps {
    id: string;
    author: string;
}

export function ActionsBar({ id, author }: ActionsBarProps) {

    const { handleAddUpvote, handleAddDownvote } = useContext(ImagesContext);
    
    return (
        <div className={styles.actionsBarContainer}>
            <span>{author}</span>

            <div>
                <button onClick={() => handleAddUpvote(id)}>
                    <Image src="/assets/upvote.png" width={30} height={30} />
                </button>
                <button onClick={() => handleAddDownvote(id)}>
                    <Image src="/assets/downvote.png" width={30} height={30} />
                </button>
            </div>
        </div>
    );
}