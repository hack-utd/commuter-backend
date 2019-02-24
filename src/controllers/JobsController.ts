import { Request, Response } from "express"
// import Job, { JobModel } from "../models/Job";
// import Job from "../models/Job";

export class JobsController
{

    static companies: string[] = ["Openlane","Yearin","Goodsilron","Condax","Opentech","Golddex","year-job","Isdom","Gogozoom","Y-corporation","Nam-zim","Donquadtech","Warephase","Donware","Faxquote","Sunnamplex","Lexiqvolax","Sumace","Treequote","Iselectrics","Zencorporation","Plusstrip","dambase","Toughzap","Codehow","Zotware","Statholdings","Conecom","Zathunicon","Labdrill","Ron-tech","Green-Plus","Groovestreet","Zoomit","Bioplex","Zumgoity","Scotfind","Dalttechnology","Kinnamplus","Konex","Stanredtax","Cancity","Finhigh","Kan-code","Blackzim","Dontechi","Xx-zobam","Fasehatice","Hatfan","Streethex","Inity","Konmatfix","Bioholding","Hottechi","Ganjaflex","Betatech","Domzoom","Ontomedia","Newex","Betasoloin","Mathtouch","Rantouch","Silis","Plussunin","Plexzap","Finjob","Xx-holding","Scottech","Funholding","Sonron","Singletechno","Rangreen","J-Texon","Rundofase","Doncon"];
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
        let jobs: Job[] = [];
        for (let i = 0; i < Math.random() * 25; i++)
        {


            let job: Job = {
                company: JobsController.companies[Math.floor(Math.random()*JobsController.companies.length)],
                location: randomLocationWithinRadius(request.body.location[0], request.body.location[1], request.body.radius),
                title: "TODO",
                keywords: request.body.keywords,
                description: "This company is great.",
                pay: 45000,
                applyLink: "google.com"
            };
            jobs.push(job)
        }


        // let jobs: any;
        // try
        // {
        //     jobs = await Job.find();
        // } catch (error)
        // {
        //     console.log(error);
        // }

        // jobs = jobs.filter((job: any) =>
        // {
        //     const lat1 = request.body.location[0];
        //     const long1 = request.body.location[1];
        //     const lat2 = job.location[0];
        //     const long2 = job.location[1];
        //     const distance = calculateDistance(lat1, long1, lat2, long2);
        //     if (distance < request.body.radius) { return true };
        //     const keySearch = request.body.keywords.some((keyword: string) =>
        //     {
        //         if (job.company.toLowerCase() === keyword.toLowerCase()) { return true }
        //         if (job.description.toLowerCase().includes(keyword)) { return true }
        //         if (job.title.toLowerCase() === keyword.toLowerCase()) { return true }
        //         let test = job.keywords.some((key: string) =>
        //         {
        //             if (key.toLowerCase() === keyword.toLowerCase()) { return true };
        //             return false;
        //         })
        //         if (test) { return true }
        //         return false;
        //     });
        //     if (keySearch) { return true }
        //     return false;
        // })

        return response.send(jobs);
    }

    // public static async index(request: Request, response: Response)
    // {
    //     try
    //     {
    //         const jobs = await Job.find();
    //         response.send(jobs);
    //     } catch (error)
    //     {
    //         console.log(error);
    //     }

    // }
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number)
{
    var R = 6371000;
    var a = 0.5 - Math.cos((lat2 - lat1) * Math.PI / 180) / 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * (1 - Math.cos((lon2 - lon1) * Math.PI / 180)) / 2;
    return R * 2 * Math.asin(Math.sqrt(a));
}

// Converts numeric degrees to radians
function toRad(Value: number)
{
    return Value * Math.PI / 180;
}

function randomLocationWithinRadius(lat: number, long: number, radius: number): number[]
{
    var y0 = lat;
    var x0 = long;
    var rd = radius / 111300;

    var u = Math.random();
    var v = Math.random();

    var w = rd * Math.sqrt(u);
    var t = 2 * Math.PI * v;
    var x = w * Math.cos(t);
    var y = w * Math.sin(t);

    let newY = y + y0;
    let newX = x + x0

    return [newY, newX];

}

interface Job
{
    company: string,
    location: number[],
    title: string,
    keywords: [string],
    description: String,
    pay: number,
    applyLink: string
}

