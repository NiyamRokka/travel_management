import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import CustomError from "../middlewares/error.middleware";


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

        const {id} = req.params
        const user = await User.findOne({_id:id})
        console.log(user)
        
        if (!user){
            throw new CustomError('User Not Found',404)
        }

        res.status(200).json({
            message:"User Found",
            status:"Success",
            success:false,
            data: user,
        })

    }catch(error){
        next(error)
    }
}

export const updUser = async(req:Request,res:Response,next:NextFunction)=>{
    try{

        const {id} = req.params
        const user = await User.findOneAndUpdate({_id:id,},req.body,{new:true})
        console.log(user)
        
        if (!user){
            throw new CustomError('User Not Found',404)
        }

        res.status(200).json({
            message:"User Updated Successfully",
            status:"Success",
            success:false,
            data: user,
        })

    }catch(error){
        next(error)
    }
}