import {Schema,model} from 'mongoose'
import {gender,role} from '../types/enum.types'


const userSchema = new Schema({
    firstName:{
        type:String,
        required:[true,'First Name is required'],
        trim:true,
    },

    lastName:{
        type:String,
        required:[true,'Last Name is required'],
        trim:true,
    },

    email:{
        type:String,
        required:[true,'Email is required'],
        trim:true,
        unique: [true,'Email already registered, would you like to login?']
    },

    password:{
        type:String,
        required:[true,'Minimum of 4 character is required'],
        min: 4,
    },

    role:{
        type:String,
        enum:Object.values(role),
        default:role.user,
    },

    phone_number:{
        type:String,  
    },

    gender: {
        type:String,
        enum:Object.values(gender),
        default:gender.rathernotsay,
    },



},{timestamps:true})


const User = model('user',userSchema)

export default User;


