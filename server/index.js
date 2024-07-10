import express from 'express';
import 'dotenv/config'; 
import cors from 'cors';

import dbConnection from './config/dbConnection.js';
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';
import brandRouter from './routes/brandRoutes.js';
import modelRouter from './routes/modelRoutes.js';
import servicesRouter from './routes/serviceRoutes.js';
import orderRouter from './routes/orderRoutes.js';

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
app.use('/brands', brandRouter);
app.use('/models', modelRouter);
app.use('/services', servicesRouter);
app.use('/orders', orderRouter);

try {
    app.listen(PORT, ()=>console.log(`Server running in port ${PORT}`));
} catch (error) {
    console.log(error);
}

