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
            const response = await axios.post('https://login-itj2.onrender.com/api/login', { username, password }, { withCredentials: true });
            console.log('Respuesta del backend:', response.data);
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
