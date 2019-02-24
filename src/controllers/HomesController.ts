import { Request, Response } from "express"
import fetch from "node-fetch";

export class HomesController
{




    /**
     *  URL("/home")
     *  {
     *      "location": [lat, long]
     *  }
     */
    public static async home(request: Request, response: Response)
    {
        let address: string = await HomesController.addressByCoords(request.body.location[0], request.body.location[1]);
        return response.send(address);
    }

    private static async addressByCoords(lat: number, long: number)
    {

        let query = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.GOOGLE_APP_KEY}`
        let response = await fetch(query);
        let data = await response.json();

        return data.results[0].formatted_address;
    }
}

interface Address
{
    street: string;
    zip: number;
    city: string;
    state: string;
}

interface Home
{
    address: Address;
    price: number;
    neighborhoodScore: number;
}