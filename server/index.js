import express from 'express';
import 'dotenv/config'; 
import cors from 'cors';

import dbConnection from './config/dbConnection.js';
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

dbConnection;

app.get('/', (req, res)=> {
    res.json({
        message: 'Hello'
    });
});

app.use('/', authRouter)
app.use('/users', userRouter);

try {
    app.listen(PORT, ()=>console.log(`Server running in port ${PORT}`));
} catch (error) {
    console.log(error);
}

