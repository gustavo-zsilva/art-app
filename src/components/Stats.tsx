import { useContext } from 'react';
import { DataContext } from '../contexts/DataContext';

import styles from '../styles/components/Stats.module.css';

export function Stats() {
    const { totalPublications } = useContext(DataContext);

    return (
        <div className={styles.statsContainer}>
            <section>
                <strong>Publicações</strong>
                <span>{totalPublications}</span>
            </section>
            <section>
                <strong>Publicações</strong>
                <span>15</span>
            </section>
            <section>
                <strong>Publicações</strong>
                <span>105</span>
            </section>
            <section>
                <strong>Publicações</strong>
                <span>15</span>
            </section>
        </div>
    );
}