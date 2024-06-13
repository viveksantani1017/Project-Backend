import { Request, Response } from "express";

import prisma from "../../utils/database";

export async function handle(request: Request, response: Response)
{
    const customer = await prisma.customer.findFirst({ 
        where: 
        { 
            id: parseInt(request.params.id),
            isDeleted: false
        } 
    });
    
    if (!customer)
    {
        response.status(404).send();
        return;
    }
    
    response.status(200).json({ customer: customer });
}
