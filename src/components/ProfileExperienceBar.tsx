import { useContext } from 'react';
import { DataContext } from '../contexts/DataContext';
import styles from '../styles/components/ExperienceBar.module.css';

export function ProfileExperienceBar() {
    const { currentExperience, totalExperience } = useContext(DataContext);

    const experienceToPercentage = (currentExperience * 100) / totalExperience;

    return (
        <div className={styles.experienceBarContainer}>
            <span>0 xp</span>
            <div>
                <div
                    style={{ width: `${experienceToPercentage}%` }}
                />
                <span
                    className={styles.currentExperience}
                    style={{ left: `${experienceToPercentage}%` }}
                >
                    {currentExperience} xp
                </span>
            </div>
            <span>64 xp</span>
        </div>
    );
}