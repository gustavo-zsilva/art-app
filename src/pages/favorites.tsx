import Head from 'next/head';

import { FavoriteArts } from '../components/FavoriteArts';
import { Layout } from "../components/Layout";

import styles from '../styles/pages/Favorites.module.css';

export default function Favorites() {
    return (
        <Layout>
            <div className={styles.favoritesContainer}>
                <Head>
                    <title>Favoritos | Art App</title>
                </Head>

                <FavoriteArts />
            </div>
        </Layout>
    );
}