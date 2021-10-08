import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './utils/connectDB';

//init app
dotenv.config();
const app = express();
app.use(cors());

// connect to DB
connectDB(process.env.DB_URI);

app.get('/', (req, res) => res.json({ msg: 'Welcome to Sylica REST API' }));

// define router paths

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Sever started on port ${PORT}`));
