import Job from "./models/Job";
import * as mongoose from "mongoose";

async function seed()
{
    for (let i = 0; i < 10; i++)
    {
        const job = new Job({
            company: "Company Name",
            location: [Math.random() * 100, Math.random() * 100],
            title: "Job Title",
            description: "This is a job description.",

            pay: Number(Math.random() * 100000).toFixed(2),
            applyLink: "https://google.com/"
        });
        await job.save();

    }
    process.exit();
}

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

seed();
