import * as express from "express";

export class TestController
{
    /**
     * URL("/test");
     * @param request
     * @param response
     * @param next
     */
    public static index(request: express.Request, response: express.Response, next: express.NextFunction)
    {
        return response.send("This is working ... JAMAL!");
    }
}