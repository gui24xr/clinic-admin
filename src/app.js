import express from 'express'
import morgan from 'morgan'
import { clinicOfficesRouter } from './routes/clinic-offices.router.js'


export const app = express()

//Middlewares
app.use(express.json())
app.use(morgan('dev'));// Registra en formato 'combinsed'


//Routing
app.use('/',clinicOfficesRouter)

app.get('/',(req,res,next)=>{
      
    res.send('Escuchando...')
})


