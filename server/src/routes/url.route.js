import express from 'express'
import { deleteUrlController, getAllUrlController, postUrlController, testController } from '../controllers/url.controller.js'

export const urlRoutes = express.Router()

//test api
urlRoutes.get('/test',testController)

//post api for long url storing and giving short url
urlRoutes.post('/',postUrlController)

//get api for getting all data from the db
urlRoutes.get('/',getAllUrlController)

//delete api for deleting specific data from DB
urlRoutes.delete('/:id',deleteUrlController)
