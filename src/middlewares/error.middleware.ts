import { NextFunction, Request, Response } from "express";

class CustomError extends Error {
    statusCode:number
    status:'success'|'fail'|'error'
    success:boolean;
    isOperational:boolean;
    constructor(message:string , statuscode:number){
        super(message);

        this.statusCode = statuscode;
        this.status = statuscode >= 400 && statuscode < 500 ? 'fail' : 'error'
        this.success = false
        this.isOperational = true;
        Error.captureStackTrace(this,CustomError)
    }
}


export const ErrorHandller = (err:any,req:Request,res:Response,next:NextFunction)=>{
    const statuscode = err.statuscode || 500;
    res.status(statuscode).json({
        message : err.message ?? 'Internal Server Error',
        status : err.status ?? 'Fail',
        success : err.success ?? false,
        data:null
    })
}

export default CustomError;