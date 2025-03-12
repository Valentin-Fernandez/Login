import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async e => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/login', { username, password }, { withCredentials: true });
            navigate('/dashboard');
        } catch (error) {
            console.error('Error en el login', error.response?.data?.message);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Usuario" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" />
            <button type="submit">Iniciar Sesión</button>
        </form>
    );
}
