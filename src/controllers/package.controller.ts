import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/async_handler.utils";
import Package from "../models/package.model";
import CustomError from "../middlewares/error.middleware";



export const createPackage = asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        const {title,plans,start_date,end_date,seats_available,total_charge,cost_type} = req.body
        console.log(plans)


        const packageCreator = await  Package.create({
            title,
            plans:JSON.parse(plans),
            start_date,
            end_date,
            seats_available,
            total_charge,
            cost_type
        })

        
        if(!createPackage){
            throw new CustomError('Something went wrong',500)
        }
        
        res.status(200).json({
            message:"Package Created Successfully",
            status:"Success",
            success:true,
            data:packageCreator,
        })
    })


export const delPackage = asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        const {id} = req.params
        const packagee = await Package.findByIdAndDelete(id)
        console.log(packagee)
            
        if (!packagee){
            throw new CustomError('Package Not Found',404)
        }
    
         res.status(200).json({
              message:"Package Deleted Successfully",
             status:"Success",
              success:true,
             data: packagee,
            })
        })



export const updPackage = asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
      const {start_date,end_date,seats_available,plans} = req.body
        const {id} = req.params
        const packager = await Package.findByIdAndUpdate(id,{start_date,end_date,seats_available,plans:JSON.parse(plans)},{new:true,reValidate:true})
        console.log(packager)
            
        if (!packager){
            throw new CustomError('Package Not Found',404)
        }
        
        res.status(200).json({
            message:"Package Updated Successfully",
            status:"Success",
            success:true,
            data: packager,
        })
    })




export const getAllPackage = asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        const allpackages:any = await Package.find()
        res.status(200).json({
            message:'All Packages Fetched',
            success:true,
            status:'success',
            data:allpackages
        })
    })

export const getById = asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        const {id} = req.params
        const usingId = await Package.findOne({_id:id})
        console.log(usingId)
        
        if (!usingId){
            throw new CustomError('Package Not Found',404)
        }

        res.status(200).json({
            message:"Package Found",
            status:"Success",
            success:true,
            data: usingId,
        })
    })