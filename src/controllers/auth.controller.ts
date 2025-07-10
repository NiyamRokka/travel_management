import { NextFunction, Request, Response } from "express";
// import { model } from "mongoose";
import User from "../models/user.model";
import { comparePassword, hashPassword } from "../utils/bcrypt.utils";
import CustomError from "../middlewares/error.middleware";
import { asyncHandler } from "../utils/async_handler.utils";

export const Registered= asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        const {firstName,lastName,email,password,phone_number,gender} = req.body

        if (!password){
            throw new CustomError('Password is required',404)
        }
        const user = new User({firstName,lastName,email,password,phone_number,gender})
        
        const hashedpassword = await hashPassword(password)

        user.password = hashedpassword

        await user.save()

        res.status(201).json({
            message:'User Registered Successfully',
            success:true,
            status:'Success',
            data:user,
        })
    })


export const Login = asyncHandler(async(req:Request,res:Response,next:NextFunction) =>{
        const {email,password} = req.body

        if(!email){
            throw new CustomError('Email is required',404)
        }
        
         if(!password){
            throw new CustomError('Password is required',404)
        }

        const user = await User.findOne({email})

        if(!user){
            throw new Error('Credentials does not match')
        }
        //! generate token
    const {password:userPass,...userData} = user

        const isPasswordMatch = await comparePassword(password,userPass)

        if (!isPasswordMatch){
            throw new Error('Password does not match')
        }


        res.status(201).json({
            message:'Login Successful',
            status:'success',
            success:true,
            data:userData
        })
    })