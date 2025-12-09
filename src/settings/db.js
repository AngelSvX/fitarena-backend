import mysql2 from 'mysql2/promise.js'
import dotenv from 'dotenv'

dotenv.config()

export const myGymDB = mysql2.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  database: process.env.MYSQLDATABASE,
  password: process.env.MYSQLPASSWORD
})

export const testConnection = async () => {
  try {
    const response = myGymDB.getConnection()
    console.log("Conexión establecita")
  } catch (error) {
    console.error("Sucedió un error con la conexión a la BD")
    console.log(error)    
  }
}