import axios from 'axios';
import { useState, useEffect } from 'react';

const Admin = () => {
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleLogout = async () => {
        await axios.post('https://login-itj2.onrender.com/api/logout', {}, { withCredentials: true });
        alert('Logout exitoso');
        window.location.href = '/';
    };

    const handleInformation = async () => {
        try {
            const res = await axios.get('https://login-itj2.onrender.com/api/admin', { withCredentials: true });
            // Verifica si la respuesta contiene la clave 'message'
            if (res.data && typeof res.data.message === 'string') {
                setMessage(res.data.message);
            } else {
                setError('Formato de respuesta inesperado.');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Error de autenticacion creeria');
        }
    };

    useEffect(() => {
        handleInformation();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl mb-4">Panel Administrativo</h1>
            {message && <p className="text-green-500">{message}</p>}
            {error && <p className="text-red-500">{error}</p>}
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
                Cerrar Sesión
            </button>
        </div>
    );
};

export default Admin;
