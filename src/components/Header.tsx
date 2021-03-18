import Link from 'next/link';

import { useContext } from 'react';

import { DataContext } from '../contexts/DataContext';
import { Tabs } from '../components/Tabs';

import styles from '../styles/components/Header.module.css';

export function Header() {
    const { level } = useContext(DataContext);

    return (
        <div className={styles.headerContainer}>
             <section className={styles.buttonContainer}>
                <Link href="/publish">
                    <button>
                        Publish your art!
                    </button>
                </Link>
            </section>
            <section>
                <Tabs />
            </section>
            <section className={styles.profilePreview}>
                <span>{level}</span>
                <div>
                    <span>logged as</span>
                    <strong>Gustavo Silva</strong>
                </div>
                <img src="https://github.com/gustavo-zsilva.png" alt="Avatar"/>
            </section>
        </div>
    );
}