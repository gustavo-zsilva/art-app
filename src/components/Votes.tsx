import Image from 'next/image';
import { useRouter } from 'next/router';

import { useEffect, useState, useContext } from 'react';
import { ImagesContext } from '../contexts/ImagesContext';

import styles from '../styles/components/Votes.module.css';

export function Votes() {
    const router = useRouter();

    const queryId = router.query.id;
    const id = queryId.toString();

    const { getSingleImageData } = useContext(ImagesContext);
    
    const [upvotes, setUpvotes] = useState(0);

    // PROBLEMA:: ESTAMOS MANDANDO OUTRA REQUISIÇÃO PARA PEGAR A MESMA INFORMAÇÃO.
    // O QUE FAZER? APENAS RECICLAR OS DADOS DA PRIMEIRA REQUISIÇÃO AO BACKEND ([id].tsx)
    // POR MEIO DE CONTEXT API
    async function handleGetImageData() {
        const { votes: { upvotes } } = await getSingleImageData(id);

        return upvotes;
    }

        
    useEffect(() => {
        const upvotes = handleGetImageData();

        setUpvotes(2);
    }, [])



    return (
        <div className={styles.votesContainer}>
            <button>
                <Image src="/assets/upvote.png" width={60} height={60} />
            </button>
            
            <span>
                {upvotes}
            </span>

            <button>
                <Image src="/assets/downvote.png" width={60} height={60} />
            </button>
        </div>
    );
}