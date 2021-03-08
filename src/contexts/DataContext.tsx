import { createContext, ReactNode, useState, useEffect, SetStateAction } from 'react';

export const DataContext = createContext({} as DataContextProps);

interface DataProviderProps {
    children: ReactNode;
}

interface DataContextProps {
    level: number;
    currentExperience: number;
    totalExperience: number;
    totalPublications: number;
    username: string;
    userDescription: string;
    changeUsername: (newUsername: string) => void;
    changeUserDescription: (newUserDescription: string) => void;
}

export function DataProvider({ children }: DataProviderProps) {

    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [totalExperience, setTotalExperience] = useState(64);

    const [totalPublications, setTotalPublications] = useState(0);

    const [username, setUsername] = useState('Gustavo Silva');
    const [userDescription, setUserDescription] = useState('User description');

    function changeUsername(newUsername: string) {
        setUsername(newUsername);
    }

    function changeUserDescription(newUserDescription: string) {
        setUserDescription(newUserDescription);
    }

    return (
        <DataContext.Provider
            value={{
                level,
                currentExperience,
                totalExperience,
                totalPublications,
                username,
                changeUsername,
                userDescription,
                changeUserDescription,
            }}
        >
            {children}
        </DataContext.Provider>
    );
}