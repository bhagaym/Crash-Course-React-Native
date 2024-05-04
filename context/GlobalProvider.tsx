import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getCurrentUser } from "../lib/appwrite";
import { router } from "expo-router";
import { Alert } from "react-native";

interface GlobalContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    user: any; // Ganti 'any' dengan tipe data yang sesuai dengan struktur user Anda
    setUser: React.Dispatch<React.SetStateAction<any>>;
    isLoading: boolean;
}

const defaultContextValue: GlobalContextType = {
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    user: null,
    setUser: () => {},
    isLoading: true,
};

const GlobalContext = createContext<GlobalContextType>(defaultContextValue);
export const useGlobalContext = () => useContext(GlobalContext);

interface GlobalProviderProps {
    children: ReactNode;
}

const GlobalProvider = ({ children }: GlobalProviderProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getCurrentUser();
                if (res) {
                    setIsLoggedIn(true);
                    setUser(res);
                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                    router.replace('/sign-in')
                }
            } catch (error) {
                router.replace('/sign-in')
                // throw error;
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
        
    }, []);

    const contextValue: GlobalContextType = {
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
    };

    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
