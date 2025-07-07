import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";


export const getAllUser = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const user:any = await User.find().select("-Password")

        res.status(200).json({
            message:'All Users Fetched',
            success:true,
            status:'success',
            data:user
        })
}catch(error){
    next(error)
}}

export const getById = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const user
    }
}
