// contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [userToken, setUserToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            try {
                const response = await axios.get('http://192.168.1.14:8080/api/auth/ping', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUserToken(token);

            } catch (error) {

                console.log("Token validation failed:", error.message);
                await AsyncStorage.removeItem('token');
            }
            setIsLoading(false)
        };
        checkToken();
    }, []);

    const login = async (token) => {
        await AsyncStorage.setItem('token', token);
        setUserToken(token);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        setUserToken(null);
    };

    return (
        <AuthContext.Provider value={{ userToken, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}
