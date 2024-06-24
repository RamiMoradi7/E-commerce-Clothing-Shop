import { NextFunction, Request, Response } from "express";

class LoggerMiddleware {

    // Log request to console:
    public logToConsole(request: Request, response: Response, next: NextFunction): void {

        // if (Math.random() < 0.5) {
        //     const err = { message: "Something bad...", status: 500 };
        //     next(err);
        //     return;
        // }

        // Log request to console:
        console.log("Method: ", request.method);
        console.log("Route: ", request.originalUrl);
        console.log("Body: ", request.body);
        console.log("---------------------------------");

        // Continue to next middleware or controller:
        next();
    }

}

export const loggerMiddleware = new LoggerMiddleware();
