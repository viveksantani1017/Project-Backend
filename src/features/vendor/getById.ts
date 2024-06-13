import { Request, Response } from "express";

import prisma from "../../utils/database";

export async function handle(request: Request, response: Response)
{
    const vendor = await prisma.vendor.findFirst({ 
        where: 
        { 
            id: parseInt(request.params.id),
            isDeleted: false
        } 
    });
    
    if (!vendor)
    {
        response.status(404).send();
        return;
    }
    
    response.status(200).json({ vendor: vendor });
}
