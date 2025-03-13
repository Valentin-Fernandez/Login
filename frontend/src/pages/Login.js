import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('https://login-itj2.onrender.com/api/login', { email, password }, { withCredentials: true });
            alert('Login exitoso');
            window.location.href = '/admin';
        } catch (err) {
            setError(err.response?.data?.message || 'Error al iniciar sesión');
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl mb-4">Iniciar Sesión</h2>
                {error && <p className="text-red-500">{error}</p>}
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border rounded mb-2" />
                <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 border rounded mb-4" />
                <button className="w-full bg-blue-500 text-white p-2 rounded">Entrar</button>
            </form>
        </div>
    );
};
