import mongoose from 'mongoose';
import { urlModel } from '../models/url.model.js';
import { uniqueCode } from '../utils/genrateCode.js'

export const testController = (req, res) => {
    console.log('test sucessfull on server side');
    return res.status(200).json({
        message: "test sucessful on client side"
    })
}

export const postUrlController = async (req, res) => {

    const { url } = req.body;

    //chaeck 1-> url is present in input or not
    if (!url) {
        return res.status(400).json({
            message: "please enter url"
        })
    }

    //check 2-> if url is too long
    if (url.length > 2048) {
        return res.status(400).json({
            message: "url is too long"
        })
    }

    //check 3-> if url is valid and folowwing right protocol or not
    if (!url.startsWith("http://") && !url.startsWith('https://')) {
        return res.status(400).json({
            message: "Please enter a valid URL starting with http:// or https://"
        })
    }

    //genrate a unique short code for url
    const code = await uniqueCode();

    //create a entry in db
    const newurl = await urlModel.create({
        originalUrl: url,
        shortCode: code,
        clicks: 0
    })

    //send the respose
   return res.status(201).json({
        sucess:true,
        message: 'short-code created sucessfully',
        data: newurl
    })

}

export const getAllUrlController = async (req, res) => {

    try {
        const data = await urlModel.find()

        return res.status(200).json({
            success:true,
            message: "sucessfully fetched all the urls",
            data
        })
    } catch (error) {
        console.log('error in fetching all the data from the DB', error);

            return res.status(500).json({
            success:false,
            message: "failed to fetch the data from DB"
        })

    }
}

export const deleteUrlController = async (req,res)=>{
    
    const {id} = req.params

    if(!id){
        return res.status(400).json({
            success:false,
            message:"id not found in params"
        })
    }
    
    try {

        const isValidId = mongoose.Types.ObjectId.isValid(id);

        if(!isValidId){
            return res.status(400).json({
                success:false,
                message:"invalid id"
            })
        }

        const deleteUrl = await urlModel.findOneAndDelete({_id:id});
        
        if(!deleteUrl){
            return res.status(404).json({
                success:false,
                message:"url not found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"url deleted sucessfully"
        })
    } catch (error) {
        console.log('error in deleting the url',error);

        return res.status(500).json({
            success:false,
            message:"internal server hand"
        })
        
    }
    
    
    
    res.send('delete')
}

