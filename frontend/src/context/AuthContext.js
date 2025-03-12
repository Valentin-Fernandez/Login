import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/verify', { withCredentials: true });
                setUser(response.data.user);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const logout = async () => {
        await axios.post('http://localhost:8080/api/logout', {}, { withCredentials: true });
        setUser(null);
    };

    return <AuthContext.Provider value={{ user, loading, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
