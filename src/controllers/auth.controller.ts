import { NextFunction, Request, Response } from "express";
// import { model } from "mongoose";
import User from "../models/user.model";
import { comparePassword, hashPassword } from "../utils/bcrypt.utils";
import CustomError from "../middlewares/error.middleware";

export const Registered= async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {firstName,lastName,email,password,phone_number,gender} = req.body

        if (!password){
            throw new Error('Password is required')
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
    }catch (error) {
        next(error)
    }
}


export const Login = async(req:Request,res:Response,next:NextFunction) =>{
    try{
        const {email,password} = req.body

        if(!email){
            throw new Error('Email is required')
        }
        
         if(!password){
            throw new Error('Password is required')
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
    }catch (error){
        next(error)
    }
}