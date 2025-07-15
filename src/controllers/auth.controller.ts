import { NextFunction, Request, Response } from "express";
// import { model } from "mongoose";
import User from "../models/user.model";
import { comparePassword, hashPassword } from "../utils/bcrypt.utils";
import CustomError from "../middlewares/error.middleware";
import { asyncHandler } from "../utils/async_handler.utils";
import { generateToken } from "../utils/jwt.utils";
import { Ipayload } from "../types/global.types";

export const Registered= asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        const {firstName,lastName,email,password,phone_number,gender} = req.body

        if (!password){
            throw new CustomError('Password is required',400)
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
            throw new CustomError('Email is required',400)
        }
        
         if(!password){
            throw new CustomError('Password is required',400)
        }

        const user = await User.findOne({email})

        if(!user){
            throw new CustomError('Credentials does not match',400)
        }





    const {password:userPass,...userData} = user

        const isPasswordMatch = await comparePassword(password,userPass)

        if (!isPasswordMatch){
            throw new CustomError('Credentials does not match',400)
        }


    //! generate token
        const payload:Ipayload ={
            _id:user._id,
            email:user.email,
            firstName:user.firstName,
            lastName:user.lastName,
            role:user.role

        }
        const token = generateToken(payload)
        console.log(token)
        res.status(201).json({
            message:'Login Successful',
            status:'success',
            success:true,
            data:{
                data:userData,
                access_token:token
            }
        })
    })