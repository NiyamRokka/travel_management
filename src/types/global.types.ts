import { role } from "./enum.types";
import mongoose from "mongoose";

export interface Ipayload {
    _id:mongoose.Types.ObjectId;
    email:string,
    firstName:string,
    lastName:string,
    role:role
}