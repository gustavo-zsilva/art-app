import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

import axios from 'axios';
import { Layout } from '../../components/Layout';

export default function Post({ data }) {
    // const router = useRouter();
    // const { id } = router.query;
    
    const parsedImgPath = data.img.path.replace('public', '');
    

    return (
        <Layout>
            <Head>
                <title>Username | Art App</title>
            </Head>

            <div>
                <img src={parsedImgPath} alt=""/>
            </div>
        </Layout>
    );
}

async function getAllPostIds() {
    const response = await axios.get('http://localhost:3000/api/images');
    const data = response.data.data;
    
    return data.map(img => {
        return {
            params: {
                id: img._id 
            }
        }
    })
}

async function getImageData(id: string) {
    const imageData = await axios.get(`http://localhost:3000/api/images/${id}`);
    const data = imageData.data.data;

    return data;
}

export const getStaticPaths = async () => {
    const imagesIds: Array<string | { params: {[id: string]: string} }> = await getAllPostIds();

    return {
        paths: imagesIds,
        fallback: false
    }
}

export const getStaticProps = async ({ params }) => {
    const data: [] = await getImageData(params.id);

    return {
        props: {
            data,
        }
    }
}

