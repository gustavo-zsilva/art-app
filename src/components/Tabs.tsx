import { useState } from 'react';

import Link from 'next/link';

import styles from '../styles/components/Tabs.module.css';

const inlineStyles = {
    borderTop: '3px solid var(--primary)',
    background: 'var(--platinum)',
    color: 'var(--primary)',
    fontSize: 18
}

const buttonArray = [
    'Recent',
    'Favorites',
    'Profile'
]

export function Tabs() {

    const [activeTabId, setActiveTabId] = useState(0);

    return (
        <div className={styles.tabsContainer}>
            { buttonArray.map((label, index) => (
                activeTabId === index ? (
                    <Link href={label.toLowerCase()}>
                        <button
                            key={index}
                            style={inlineStyles}
                        >
                            {label}
                        </button>
                    </Link>
                ) : (
                    <Link href={label.toLowerCase()}>
                        <button
                            key={index}
                            id={String(index)}
                            onClick={(e) => setActiveTabId(Number(e.currentTarget.id))}
                        >
                            {label}
                        </button>
                    </Link>
                )
                   
                )
            ) }
        </div>
    );
}