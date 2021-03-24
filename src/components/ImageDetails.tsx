import { useContext } from 'react';
import { ImageContext } from '../contexts/ImageContext';
import styles from '../styles/components/ImageDetails.module.css';

export function ImageDetails() {

    const { author } = useContext(ImageContext);

    return (
        <div className={styles.imageDetailsContainer}>
            <span>
                Postado por
                {' '}
                <span>
                    <img src="http://github.com/gustavo-zsilva.png"/>
                    { author }
                </span>
            </span>
            <span>Postado em 04/10/2020</span>
        </div>
    );
}