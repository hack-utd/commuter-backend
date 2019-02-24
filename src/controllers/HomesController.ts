import * as express from "express"

export class HomesController
{

    public static hold(request: express.Request, response: express.Response, next: express.NextFunction)
    {
        return response.send({});
    }
}