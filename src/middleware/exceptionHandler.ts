import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

function exceptionHandler(_1: Error, _2: Request, response: Response, next: NextFunction)
{
    try
    {
        next();
    }
    catch (ex: any)
    {
        logger.error(ex);
        if (process.env.NODE_ENV === "development")
        {
            response.status(500).json({
                stack: ex.stack || {}
            });
        }
        else
        {
            logger.error(ex);
            response.status(500).json("Something went wrong");
        }
    }
}

export default exceptionHandler;
