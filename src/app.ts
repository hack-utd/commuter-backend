import * as dotenv from "dotenv";
import * as express from "express";
// import * as mongoose from "mongoose";
// import * as session from "express-session";
import * as bodyParser from "body-parser";



dotenv.config({ path: ".env" });

import { TestController, JobsController } from "./controllers"
import { HomesController } from "./controllers/HomesController";
import { RideShareController } from "./controllers/RideShareController";

const app = express();

// // Connect to MongoDB
// (<any>mongoose).Promise = Promise;
// const uri: string = "mongodb://127.0.0.1:27017/commuter"
// try
// {
//     mongoose.connect(uri).then(() =>
//     {
//         console.log("Succesfully Connected To Mongo!");
//     }).catch((error: any) => console.log(error));
// }catch(error)
// {
//     console.log(error)
// }


// Express Config
app.set("port", 80);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Primary app routes.
app.get("/test", TestController.index);

/**
 * URL("/jobs")
 *{
 *    keywords: ["fun", "inclusive", "GitHub", "Devops"],
 *    radius: 25
 *    location: [29.28397345, 73.2387940534]
 *}
 */
app.post("/jobs", JobsController.query);

/**
 *  URL("/home")
 *  {
 *      "location": [lat, long]
 *  }
 */
app.post("/home", HomesController.home)

/**
 *  URL("/rides")
 *  {
 *      location1: [lat, long],
 *      location2: [lat, long]
 *  }
 */
app.post("/rides", RideShareController.rideSharePrices)











export default app;