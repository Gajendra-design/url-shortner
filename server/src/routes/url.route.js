import express from 'express'
import { deleteAllController, deleteUrlController, getAllUrlController, postUrlController, testController } from '../controllers/url.controller.js'

export const urlRoutes = express.Router()

//test api
urlRoutes.get('/test',testController)

//post api for long url storing and giving short url
urlRoutes.post('/',postUrlController)

//get api for getting all data from the db
urlRoutes.get('/',getAllUrlController)

//deleteAll api for deleting all the data from DB
urlRoutes.delete('/deleteAll',deleteAllController)  //this url is above from delete through id wali api because in express the order of endpints which we are defining matters so if it is not abouve then express will run /:id in delete method first and because deleteAll i not a valid id parameter then it will convert it in bad request as we defind in out deleteUrlController

//delete api for deleting specific data from DB
urlRoutes.delete('/:id',deleteUrlController)
