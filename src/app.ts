import * as dotenv from "dotenv";
import * as express from "express";
import * as mongoose from "mongoose";
import * as session from "express-session";
import * as bodyParser from "body-parser";



dotenv.config({ path: ".env" });

import { TestController, JobsController } from "./controllers"
import { HomesController } from "./controllers/HomesController";

const app = express();

// Connect to MongoDB
(<any>mongoose).Promise = Promise;
const uri: string = "mongodb://127.0.0.1:27017/commuter"
try
{
    mongoose.connect(uri).then(() =>
    {
        console.log("Succesfully Connected To Mongo!");
    }).catch((error: any) => console.log(error));
}catch(error)
{
    console.log(error)
}


// Express Config
app.set("port", 80);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Primary app routes.
app.get("/test", TestController.index);

/**
 * Jobs query.
 */
app.post("/jobs", JobsController.query);
app.get("/jobs", JobsController.index);

app.post("/address", HomesController.address)









export default app;