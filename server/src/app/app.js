import express from "express"
import { urlRoutes } from "../routes/url.route.js";
import { redirectController } from "../controllers/redirect.controller.js";

export const app = express();

//middelwares
app.use(express.json());

//url api routes
app.use('/api/url',urlRoutes)

//get method redirecting the urer
app.get('/:shortCode',redirectController)