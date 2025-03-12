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
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: false });
    res.json({ message: 'Login exitoso' });
});

router.get('/verify', async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: 'No autenticado',
        });
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token invalido' });
        }
        res.json({ user: { username: decoded.username } });
    });
});

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logout exitoso' });
});

export default router;
