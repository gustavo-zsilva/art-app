import Head from 'next/head';

import styles from '../styles/pages/Profile.module.css';

import { ProfileExperienceBar } from '../components/ProfileExperienceBar';
import { Profile as ProfileComponent } from '../components/Profile';
import { Stats } from '../components/Stats';
import { Layout } from '../components/Layout';
import { ControlPanel } from '../components/ControlPanel';
import { Description } from '../components/Description';

export default function Profile() {
    return (
        <Layout>
            <div className={styles.profileContainer}>
                <Head>
                    <title>Profile | Art App</title>
                </Head>
                
                <ProfileExperienceBar />

                <div className={styles.profileDetails}>
                    <div>
                        <ProfileComponent />
                        <Description />
                    </div>
                    
                    <ControlPanel />
                </div>

                <Stats />
            </div>
        </Layout>
        
    );
}