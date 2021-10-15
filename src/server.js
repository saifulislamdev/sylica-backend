import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './utils/connectDB';

// import routers
import authRouter from './routes/auth';

//init app
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

// connect to DB
connectDB(process.env.DB_URI);

app.get('/', (req, res) => res.json({ msg: 'Welcome to Sylica REST API' }));

// define router paths
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Sever started on port ${PORT}`));
