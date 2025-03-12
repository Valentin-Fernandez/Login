import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import cors from 'cors';

const app = express();
const PORT = 8080;
app.use(cors({ origin: 'https://login-psi-gray.vercel.app', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', authRoutes);

app.listen(PORT, () => {
    console.log(`Run server http://localhost:${PORT}`);
});

const url = 'mongodb+srv://fernandezvalentin108:9zmwGpnugUcuQAad@cluster0.wzu21.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
    try {
        await mongoose.connect(url);
        console.log('Conectado con exito!');
    } catch (error) {
        console.error('Error al conectarse a la DB');
        console.error(error);
    }
};

connectDB();
