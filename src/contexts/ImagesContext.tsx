import { createContext, ReactNode } from "react";

import axios from 'axios';

export const ImagesContext = createContext({} as ImagesContextProps);

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
}

interface ImagesContextProps {
    allImages: ImageProps[],
    success: boolean,
    handleAddUpvote: (id: string) => void;
    handleAddDownvote: (id: string) => void;
}

interface ImagesProviderProps {
    children: ReactNode;
    imageData: {
        success: boolean,
        data: ImageProps[],
    };
}

export function ImagesProvider({ children, imageData }: ImagesProviderProps) {

    let { data: allImages, success } = imageData;

    async function getSingleImageData(id: string) {
        const response = await axios.get(`http://localhost:3000/api/images/${id}`);

        return response.data.data;
    }

    async function handleAddUpvote(id: string) {
        const { votes: { upvotes, downvotes } } = await getSingleImageData(id);

        await axios.patch(`http://localhost:3000/api/images/${id}`, {
            votes: {
                upvotes: upvotes + 1,
                downvotes
            }
        })
    }

    async function handleAddDownvote(id: string) {
        const { votes: { upvotes, downvotes } } = await getSingleImageData(id);

        await axios.patch(`http://localhost:3000/api/images/${id}`, {
            votes: {
                upvotes,
                downvotes: downvotes + 1
            }
        })
    }

    return (
        <ImagesContext.Provider
            value={{
                allImages,
                success,
                handleAddUpvote,
                handleAddDownvote,
            }}
        >
            {children}
        </ImagesContext.Provider>
    );
}