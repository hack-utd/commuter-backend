import { Request, Response } from "express"

import fetch from "node-fetch";

// @ts-ignore
import * as Zillow from "node-zillow";

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
        let address = await HomesController.addressByCoords(request.body.location[0], request.body.location[1]);

        const zillow = new Zillow(process.env.ZILLOW_APP_KEY);

        const parameters = {
            address: `${address.address_components[0].long_name} ${address.address_components[1].long_name}`,
            citystatezip: `${address.address_components[3].long_name}, ${address.address_components[5].long_name} ${address.address_components[7].long_name}`,
            rentzestimate: false
        }

        let results = await zillow.get('GetSearchResults', parameters)

        let price = results.response.results.result[0].zestimate[0].amount[0]._;

        let home = {
            address: address.formatted_address,
            price
        }

        return response.send(home);
    }

    private static async addressByCoords(lat: number, long: number)
    {
        let query = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.GOOGLE_APP_KEY}`
        let response = await fetch(query);
        let data = await response.json();

        return data.results[0];
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
}