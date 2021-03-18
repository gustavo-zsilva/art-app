import { useState, useEffect } from 'react';

import Link from 'next/link';

import { MdPhoto, MdPhotoLibrary, MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { GiStarAltar } from 'react-icons/gi';

import styles from '../styles/components/Tabs.module.css';

const buttonStyles = {
    borderBottom: '3px solid var(--primary)',
    color: 'var(--primary)',
    fontSize: 15,
    transition: '.2s'
}

export function Tabs() {
    
    const [activeTab, setActiveTab] = useState('gallery');

    useEffect(() => {
        const sessionActiveTab = sessionStorage.getItem('activeTab');
        
        setActiveTab(sessionActiveTab);
    }, [])

    useEffect(() => {
        sessionStorage.setItem('activeTab', activeTab);
    }, [activeTab])

    return (
        <div className={styles.tabsContainer}>

            <Link href="/recent">
                <button
                    onClick={() => setActiveTab('gallery')}
                    style={activeTab === 'gallery' ? buttonStyles : null}
                >
                    {activeTab === 'gallery' ? (
                        <span>
                            <MdPhotoLibrary color="var(--primary)" size={32} />
                            Gallery
                        </span>
                    ) : <MdPhoto color="var(--platinum)" size={32} />}
                    
                </button>
            </Link>

            <Link href="/favorites">
                <button
                    onClick={() => setActiveTab('favorites')}
                    style={activeTab === 'favorites' ? buttonStyles : null}
                >
                    {activeTab === 'favorites' ? (
                        <span>
                            <MdFavorite color={"#ff7575"} size={32} />
                            Favorites
                        </span>
                    ) : <MdFavoriteBorder color="var(--platinum)" size={32} />}
                </button>
            </Link>

            <Link href="/popular">
                <button
                    onClick={() => setActiveTab('popular')}
                    style={activeTab === 'profile' ? buttonStyles : null}
                >
                  {activeTab === 'popular' ? (
                        <span>
                            <GiStarAltar color={"#ff95fa"} size={32} />
                            Popular
                        </span>
                    ) : <GiStarAltar color="var(--platinum)" size={32} />}   
                </button>
            </Link>

        </div>
    );
}