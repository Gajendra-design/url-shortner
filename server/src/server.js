import { app } from "./app/app.js";
import { config } from "./config/config.js";
import { connectDb } from "./config/db.js";

try {
    await connectDb()

    app.listen(config.PORT,()=>{
    console.log("server started sucessfully on port",config.PORT);
})
} catch (error) {
    console.log("errro in connecting mongo DB",error);
    
}
