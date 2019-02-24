import { Request, Response } from "express";

export class TestController
{
    /**
     * URL("/test");
     * @param request
     * @param response
     * @param next
     */
    public static index(request: Request, response: Response)
    {
        return response.send("This is working ... JAMAL!");
    }
}