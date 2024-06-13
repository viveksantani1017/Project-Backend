import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import logger from "../utils/logger";
import { UserType } from "../utils/constants";
import { User } from "../utils/types";

function getLoggedInUserFromToken(authHeader: string | undefined): User | undefined
{
    const token = authHeader && authHeader.split(' ')[1];

    if (!token)
        return undefined;

    try
    {
        const decodedToken = jwt.verify(token, process.env.JWT_KEY || "") as JwtPayload;
        return {
            userId: decodedToken.userId,
            userType: decodedToken.role
        };
    }
    catch (error)
    {
        console.error(error);
        logger.error(error);

        return undefined;
    }
}

export async function requireAdmin(request: Request, response: Response, next: NextFunction)
{
    const loggedInUser = getLoggedInUserFromToken(request.headers['authorization']);
    if (loggedInUser?.userType !== UserType.Admin)
    {
        response.status(401).json();
        return;
    }

    request.user = loggedInUser;
    next();
}

export async function requireUser(request: Request, response: Response, next: NextFunction)
{
    const loggedInUser = getLoggedInUserFromToken(request.headers['authorization']);
    if (!loggedInUser)
    {
        response.status(401).json();
        return;   
    }

    request.user = loggedInUser;
    next();
}
