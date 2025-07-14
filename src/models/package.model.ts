import { model, Schema } from "mongoose";
import { Package_Charge } from "../types/enum.types";

const packageSchema = new Schema({
    title:{
        type:String,
        required:[true,'Title is required'],
        trim:true,
    },
    plans:[
        {
            location:{
                type:String,
                required:[true,'Places visiting are required'],
                trim:true,
            },
            description:{
                type:String,
                required:[true,'Plan descrition is compulsory'],
            },
        }
    ],
    start_date:{
        type:String,
        required:[true,'Starting date of the tour is required'],
        trim:true,
    },
    end_date:{
        type:String,
        required:[true,'End date of the tour is required'],
        trim:true,
    },
    seats_available:{
        type:Number,
        required:[true,'Available number of seats is required'],
    },
    total_charge:{
        type:Number,
        required:[true,'Total cost of the tour is required']
    },
    cost_type:{
        type:String,
        enum:Object.values(Package_Charge),
        default:Package_Charge.PER_PERSON,
    },
},
{timestamps:true}
)

const Package = model('package',packageSchema)

export default Package;
