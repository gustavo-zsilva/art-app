import { useContext } from 'react';
import { ImagesContext } from '../contexts/ImagesContext';
import styles from '../styles/components/ImageDetails.module.css';

export function ImageDetails() {

    const { allImages } = useContext(ImagesContext);
    console.log(allImages);
    

    return (
        <div className={styles.imageDetailsContainer}>
            <span>
                Postado por
                {' '}
                <span>
                    <img src="http://github.com/gustavo-zsilva.png"/>
                    Gustavo Silva
                </span>
            </span>
            <span>Postado em 04/10/2020</span>
        </div>
    );
}