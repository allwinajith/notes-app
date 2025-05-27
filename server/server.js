import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import onBoardroute from './routes/onBoardingRoute.js';
import notesRoute from './routes/notesRoute.js';
import connectDB from './config/db.js';
import userRoute from './routes/userRoute.js';

dotenv.config();
const port = process.env.port || 5000

connectDB();

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', onBoardroute);
app.use('/api/notes', notesRoute);
app.use('/api/user', userRoute);


app.listen(port, () => console.log(`server is running on the port ${port}`));