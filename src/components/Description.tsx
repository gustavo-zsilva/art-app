import { useContext } from 'react';
import { DataContext } from '../contexts/DataContext';

import styles from '../styles/components/Description.module.css';

export function Description() {
    const { userDescription } = useContext(DataContext);

    return (
        <div className={styles.descriptionContainer}>
            <img src="/assets/quote.svg" alt="Quote"/>
            <p>
                {userDescription}
            </p>
        </div>
    );
}