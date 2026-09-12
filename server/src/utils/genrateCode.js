import { urlModel } from '../models/url.model.js'

const genrateCode = () => {

    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let code = '';

    for (let i = 0; i < 6; i++) {
        const index = Math.floor(Math.random() * characters.length)
        code += characters.charAt(index)
    }

    return code;
}

export const uniqueCode = async () => {
    let code = genrateCode();
    let exist = await urlModel.findOne({ shortCode: code });

    while (exist) {
        code = genrateCode();
        exist = await urlModel.findOne({ shortCode: code })
    }

    return code;

}