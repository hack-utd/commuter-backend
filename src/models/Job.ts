import * as mongoose from "mongoose";
import { Location } from "../types/Location";



export type JobModel = mongoose.Document & {
    company: string,
    location: [number],
    title: string,
    description: string,
    pay: number,
    applyLink: string
};


const jobSchema = new mongoose.Schema({
    company: String,
    location: [Number],
    title: String,
    description: String,
    pay: Number,
    applyLink: String
});



const Job = mongoose.model("Job", jobSchema);
export default Job;