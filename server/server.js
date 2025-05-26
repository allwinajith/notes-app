import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config();
const port = process.env.port || 5000

console.log(process.env.port)

const app = express()
app.use(cors())


app.listen(port, () => console.log(`server is running on the port ${port}`));