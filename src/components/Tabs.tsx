import { useState, useEffect } from 'react';

import Link from 'next/link';

import styles from '../styles/components/Tabs.module.css';

const inlineStyles = {
    borderTop: '3px solid var(--primary)',
    color: 'var(--primary)',
    fontSize: 18,
    transition: '.2s'
}

const pagesArray = [
    'Recent',
    'Favorites',
    'Profile'
]

export function Tabs() {
    
    const [activeTabId, setActiveTabId] = useState(0);

    useEffect(() => {
        const sessionActiveTab = sessionStorage.getItem('activeTab') || 0;
        
        setActiveTabId(Number(sessionActiveTab));
    }, [])

    function changeActiveTab(id: number) {
        sessionStorage.setItem('activeTab', String(id));
    }

    return (
        <div className={styles.tabsContainer}>
            { pagesArray.map((label, index) => (
                activeTabId === index ? (
                    <button
                        key={label}
                        style={inlineStyles}
                    >
                        {label}
                    </button>
                ) : (
                    
                    <Link
                        key={label}
                        href={label.toLowerCase()}
                    >
                        <button
                            id={String(index)}
                            onClick={(e) => changeActiveTab(Number(e.currentTarget.id))}
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