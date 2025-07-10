import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import CustomError from "../middlewares/error.middleware";
import { asyncHandler } from "../utils/async_handler.utils";

export const getAllUser = asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        const user:any = await User.find().select("-Password")
        res.status(200).json({
            message:'All Users Fetched',
            success:true,
            status:'success',
            data:user
        })
    })

export const getById = asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        const {id} = req.params
        const user = await User.findOne({_id:id})
        console.log(user)
        
        if (!user){
            throw new CustomError('User Not Found',404)
        }

        res.status(200).json({
            message:"User Found",
            status:"Success",
            success:true,
            data: user,
        })
    })

export const updUser = asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{

        const {firstName,lastName,phone_number,gender} = req.body
        const {id} = req.params
        const user = await User.findByIdAndUpdate({id,},{firstName,lastName,phone_number,gender},{new:true})
        console.log(user)
        
        // alternative method 
        // if(firstName) user.firstName = firstName;
        // if(lastName) user.lastName = lastName;
        // if(phone_number) user.phone_number = phone_number;
        // if(gender) user.gender = gender;
        // await user.save()
        
        
        
        if (!user){
            throw new CustomError('User Not Found',404)
        }
        res.status(200).json({
            message:"User Updated Successfully",
            status:"Success",
            success:true,
            data: user,
        })
    })
    
export const delUser = asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        const {id} = req.params
        const user = await User.findByIdAndDelete(id)
        console.log(user)
        
        if (!user){
            throw new CustomError('User Not Found',404)
        }

        res.status(200).json({
            message:"User Deleted Successfully",
            status:"Success",
            success:true,
            data: user,
        })
    })