import styles from '../styles/components/Header.module.css';

export function Header() {
    return (
        <div className={styles.headerContainer}>
            <div>
                <span>15</span>
                <div>
                    <span>logged as</span>
                    <strong>Gustavo Silva</strong>
                </div>
                <img src="https://github.com/gustavo-zsilva.png" alt="Avatar"/>

            </div>
        </div>
    );
}