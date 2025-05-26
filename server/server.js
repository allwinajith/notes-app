import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import onBoardroute from './routes/onBoardingRoute.js';
import connectDB from './config/db.js';

dotenv.config();
const port = process.env.port || 5000

connectDB();

const app = express()
app.use(cors())

app.use('/api/auth',onBoardroute);


app.listen(port, () => console.log(`server is running on the port ${port}`));