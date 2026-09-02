import mongoose from "mongoose";
const schema = new mongoose.Schema({
    xAxis:{
         type:Number,
         required:true,
    },
    yAxis:{
        type:Number,
        required:true,

    },
        ulpin: {
        type: String,
        required: true,
        unique: true, 
        minlength: 14,
        maxlength: 14
    },
        zAxis:{
         type:Number,
         required:true,
        },
        stateCode:{
         type:String,
         required:true,
        } ,      
        districtCode:{
         type:String,
         required:true,
        } ,
        floor:{
         type:Number,
         required:true,
         default:0,
        } ,
                        
},{timestamps:true})

const uidModel = mongoose.model("uidModel", schema);
export default uidModel;