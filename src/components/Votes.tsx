import { useEffect, useState, useContext } from 'react';
import Image from 'next/image';

import { ImageContext } from '../contexts/ImageContext';

import styles from '../styles/components/Votes.module.css';

export function Votes() {
    
    const {
        upvotes,
        handleAddUpvote,
        handleAddDownvote
    } = useContext(ImageContext);

    return (
        <div className={styles.votesContainer}>
            <button onClick={handleAddUpvote}>
                <Image src="/assets/upvote.png" width={60} height={60} />
            </button>
            
            <span>
                {upvotes}
            </span>

            <button onClick={handleAddDownvote}>
                <Image src="/assets/downvote.png" width={60} height={60} />
            </button>
        </div>
    );
}