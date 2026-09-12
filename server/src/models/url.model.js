import mongoose from 'mongoose'

const urlSchema = new mongoose.Schema({
    originalUrl:{
        type:String,
        required:true,
        maxlength:2048
    },
    shortCode:{
        type:String,
        required:true,
        unique:true
    },
    clicks:{
        type:Number,
        require:true,
        default:0
    }
},
{
    timestamps:true
})


export const urlModel = mongoose.model('urls',urlSchema)