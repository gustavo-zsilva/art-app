import { useContext } from 'react';
import { DataContext } from '../contexts/DataContext';
import styles from '../styles/components/Profile.module.css';
import { Description } from './Description';

export function Profile() {

    const { level, username } = useContext(DataContext);

    return (
        <div className={styles.profileContainer}>
            <img className={styles.profileImage} src="https://github.com/gustavo-zsilva.png" alt="Avatar" />
            <div>
                <strong>{username}</strong>
                <span>
                    <img src="/assets/level.svg" alt="Level" />
                    Level {level}
                </span>
            </div>
        </div>
    );
}