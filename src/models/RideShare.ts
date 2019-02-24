import * as mongoose from "mongoose";
import { Location } from "../types/Location";

export type homeModel = mongoose.Document & {
    price: number,
    beds: number,
    baths: number,
    neighborhoodQuality: number
    address: string,
    location: Location
};


const homeSchema = new mongoose.Schema({
    address: String,
    location: Location,
    price: Number,
    beds: Number,
    baths: Number,
    neighborhoodQuality: Number
}, { timestamps: true });


const Home = mongoose.model("Job", homeSchema);
export default Home;