import { createContext, ReactNode, useEffect, useState } from "react";

import axios from 'axios';

export const ImageContext = createContext({} as ImageContextProps);

type ImageProps = {
    _id: string,
    img: {
        path: string,
        contentType: string,
    },
    author: string,
    votes: {
        upvotes: number,
        downvotes: number,
    }
    createdAt: string,
}

interface ImageContextProps {
    image: ImageProps;
    upvotes: number;
    downvotes: number;
    author: string;
    handleAddUpvote: () => void;
    handleAddDownvote: () =>  void;
}

interface ImageProviderProps {
    children: ReactNode;
    image: ImageProps;
}

export function ImageProvider({ children, image }: ImageProviderProps) {
    
    console.log(image);
    

    const [upvotes, setUpvotes] = useState(0);
    const [downvotes, setDownvotes] = useState(0);
    const [author, setAuthor] = useState('');

    async function handleInitialStates() {
        const response = await axios.get(`http://localhost:3000/api/images/${image._id}`);
        const data: ImageProps = response.data.data;

        setUpvotes(data.votes.upvotes);
        setDownvotes(data.votes.downvotes);
        setAuthor(data.author);
    }

    useEffect(() => {
        handleInitialStates();
    }, [])

    async function getUpdatedImageData() {
        const response = await axios.get(`http://localhost:3000/api/images/${image._id}`);
        return response.data.data;
    }

    async function handleAddUpvote() {
        setUpvotes(upvotes + 1);

        const { votes } = await getUpdatedImageData();
        
        await axios.patch(`http://localhost:3000/api/images/${image._id}`, {
            votes: {
                upvotes: votes.upvotes + 1,
                downvotes: votes.downvotes
            }
        })
    }

    async function handleAddDownvote() {
        setDownvotes(downvotes + 1);

        const { votes } = await getUpdatedImageData();

        await axios.patch(`http://localhost:3000/api/images/${image._id}`, {
            votes: {
                upvotes: votes.upvotes,
                downvotes: votes.downvotes + 1
            }
        })
    }

    return (
        <ImageContext.Provider
            value={{
                image,
                upvotes,
                downvotes,
                author,
                handleAddUpvote,
                handleAddDownvote,
            }}
        >
            {children}
        </ImageContext.Provider>
    );
}