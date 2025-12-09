import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { testConnection } from './settings/db.js';
import loginRouter from './routes/auth.routes.js';
import specialityRouter from './routes/speciality.routes.js';
import { payRouter } from './routes/pay.routes.js';

const app = express();
dotenv.config()

app.use(cors())
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

app.listen(process.env.PORT, () => {
  console.log(`Server iniciando en el puerto ${process.env.PORT | 3000}`)
});

app.use("/api/v1/auth", loginRouter)
app.use("/api/v1/speciality", specialityRouter)
app.use("/api/v1/pay", payRouter)

testConnection()