import { Request, Response } from "express"
import Job, { JobModel } from "../models/Job";
import { join } from "path";

export class JobsController
{
    /**
     * URL("/jobs")
     *{
     *    keywords: ["fun", "inclusive", "GitHub", "Devops"],
     *    radius: 25
     *    location: [29.28397345, 73.2387940534]
     *}
     */
    public static async query(request: Request, response: Response)
    {
        let jobs: any;
        try
        {
            jobs = await Job.find();
        } catch (error)
        {
            console.log(error);
        }

        jobs = jobs.filter((job: any) =>
        {
            const lat1 = request.body.location[0];
            const long1 = request.body.location[1];
            const lat2 = job.location[0];
            const long2 = job.location[1];
            const distance = calculateDistance(lat1, long1, lat2, long2);
            if (distance < request.body.radius) { return true };
            const keySearch = request.body.keywords.some((keyword: string) =>
            {
                if (job.company.toLowerCase() === keyword.toLowerCase()) { return true }
                if (job.description.toLowerCase().includes(keyword)) { return true }
                if (job.title.toLowerCase() === keyword.toLowerCase()) { return true }
                let test = job.keywords.some((key: string) =>
                {
                    if (key.toLowerCase() === keyword.toLowerCase()) { return true };
                    return false;
                })
                if (test) { return true }
                return false;
            });
            if (keySearch) { return true }
            return false;
        })

        return response.send(jobs);
    }

    public static async index(request: Request, response: Response)
    {
        try
        {
            const jobs = await Job.find();
            response.send(jobs);
        } catch (error)
        {
            console.log(error);
        }

    }
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number)
{
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}

// Converts numeric degrees to radians
function toRad(Value: number)
{
    return Value * Math.PI / 180;
}