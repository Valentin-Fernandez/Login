import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

const JWT_SECRET = 'holamundo@gmail.com';

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword });
    res.status(201).json({ message: 'Usuario registrado' });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
    const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 3600000 });
    res.json({ message: 'Login exitoso' });
});

// Middleware para autenticar
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Acceso denegado' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token inválido' });
    }
};

// Ruta protegida
app.get('/api/admin', authMiddleware, (req, res) => {
    res.json({ message: 'Bienvenido al panel administrativo' });
});

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logout exitoso' });
});

export default router;
