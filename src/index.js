import { app } from "./app.js";
import dotenv from 'dotenv'
import { connectToDatabase } from "./config/database.js";

//Configuro dotenv para levantar variables de entorno.
dotenv.config({
    path: './values.env'
})

//Conexion a la base de datos.
connectToDatabase()


const PORT = process.env.PORT || 8081 



app.listen(PORT,()=> console.log('Server rodando...'))