import { useContext } from 'react';
import { DataContext } from '../contexts/DataContext';

import styles from '../styles/components/ControlPanel.module.css';

export function ControlPanel() {
    const {
        username,
        userDescription,
        changeUsername,
        changeUserDescription
    } = useContext(DataContext);

    return (
        <div className={styles.controlPanelContainer}>
            <header>General</header>

            <section>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => changeUsername(e.target.value)}
                    maxLength={48}
                />
                <label htmlFor="username">Your username</label>
            </section>
            <section>
                <input
                    type="text"
                    id="description"
                    value={userDescription}
                    onChange={(e) => changeUserDescription(e.target.value)}
                />
                <label htmlFor="description">Your status</label>
            </section>

        </div>
    );
}