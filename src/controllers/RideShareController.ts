import { Request, Response } from "express";
import fetch from "node-fetch";

export class RideShareController
{
    /**
     *  URL("/rides")
     *  {
     *      location1: [lat, long],
     *      location2: [lat, long]
     *  }
     */
    public static async rideSharePrices(request: Request, response: Response)
    {
        let lat1: number = request.body.location1[0];
        let long1: number = request.body.location1[1];

        let lat2: number = request.body.location2[0];
        let long2: number = request.body.location2[1];


        let lyftQuery = `https://api.lyft.com/v1/cost?start_lat=${lat1}&start_lng=${long1}&end_lat=${lat2}&end_lng=${long2}`


        let res = await fetch(lyftQuery, <any>{
            method: "GET",
            headers: {
                "Authorization": process.env.LYFT_APP_KEY
            },
        });

        let lyftData = await res.json();

        let lyftCost: number = (Number(lyftData.cost_estimates[0].estimated_cost_cents_min) + Number(lyftData.cost_estimates[0].estimated_cost_cents_max))/2
        let cost: RideCost = {
            cost: lyftCost
        }
        return response.send(cost);
    }
}

interface RideCost
{
    cost: number
}