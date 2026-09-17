import { urlModel } from "../models/url.model.js"

export const redirectController = async (req,res)=>{
    const {shortCode} = req.params

    const isShortCodeExists = await urlModel.findOne({shortCode:shortCode})

    if(isShortCodeExists === null){
      return  res.status(404).json({
            message:"url not found"
        })
    }

    res.redirect(302,isShortCodeExists.originalUrl)

    await urlModel.findOneAndUpdate({
        shortCode:shortCode
    },{
        $inc:{clicks:1}
    })
    
}