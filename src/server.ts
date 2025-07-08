import 'dotenv/config' 
import express, { NextFunction, Request, Response } from 'express'
import { connectDatabase } from './config/database.config'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import CustomError, { ErrorHandller } from './middlewares/error.middleware'

const PORT = process.env.PORT || 8080
const DB_URI = process.env.DB_URI ?? ''

console.log(PORT,DB_URI)
const app = express()

//conect database
connectDatabase(DB_URI)

//using middle wares
app.use(express.urlencoded({extended:true,limit:'5mb'}))
app.use(express.json({limit:'5mb'}))
// cors
// headers
// ...

// ping route
app.get('/',(req,res)=>{
    res.status(200).json({
        message:'Server is up and running'
    })
})


// using routes
app.use('/api/auth',authRoutes)
app.use('/api/user',userRoutes)

//fallback route
app.all('/{*abc}',(req:Request,res:Response,next:NextFunction)=>{
    const error:any = new CustomError(`Cannot ${req.method} on ${req.originalUrl}`,404)
    next(error)
})


app.listen(PORT,()=>{
    console.log(`Server is running in port http://localhost:${PORT}`)
})


app.use(ErrorHandller)
