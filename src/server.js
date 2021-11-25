import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './utils/connectDB';
// import routers
import authRouter from './routes/auth';
import productsRouter from './routes/products';
import checkoutRouter from './routes/checkout';
import orderRouter from './routes/orders';
import authenticateToken from './routes/middlewares/authenticateToken';


//init app
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// connect to DB
connectDB(process.env.DB_URI);

app.get('/', (req, res) => res.json({ msg: 'Welcome to Sylica REST API' }));

// define router paths
app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/checkout', checkoutRouter);
app.use('/api/orders', orderRouter);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
