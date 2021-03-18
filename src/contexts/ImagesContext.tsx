import { createContext, ReactNode } from "react";

export const ImagesContext = createContext({} as ImagesContextProps);

interface ImagesContextProps {
    allImages: {
        _id: string,
        img: {
            path: string,
            contentType: string,
        }
    }[],
    success: boolean,
}

interface ImagesProviderProps {
    children: ReactNode;
    imageData: {
        success: boolean,
        data: [],
    };
}

export function ImagesProvider({ children, imageData }: ImagesProviderProps) {

    const { data: allImages, success } = imageData;

    return (
        <ImagesContext.Provider
            value={{
                allImages,
                success,
            }}
        >
            {children}
        </ImagesContext.Provider>
    );
}