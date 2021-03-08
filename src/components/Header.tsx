import Link from 'next/link';

import { useContext } from 'react';
import { DataContext } from '../contexts/DataContext';

import styles from '../styles/components/Header.module.css';

export function Header() {
    const { level } = useContext(DataContext);

    return (
        <div className={styles.headerContainer}>
             <div className={styles.buttonContainer}>
                <Link href="/publish">
                    <button>
                        Publish your art!
                    </button>
                </Link>
            </div>
            <div className={styles.profilePreview}>
                <span>{level}</span>
                <div>
                    <span>logged as</span>
                    <strong>Gustavo Silva</strong>
                </div>
                <img src="https://github.com/gustavo-zsilva.png" alt="Avatar"/>
            </div>
        </div>
    );
}