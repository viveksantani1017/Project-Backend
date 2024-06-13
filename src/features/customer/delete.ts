import { Request, Response } from "express";

import prisma from "../../utils/database";

export async function handle(request: Request, response: Response)
{
    const count = await prisma.customer.count({ 
        where: 
        { 
            id: parseInt(request.params.id),
            isDeleted: false
        } 
    });

    if (count == 0)
    {
        response.status(404).json({ error: "Customer not found" });
        return;
    }

    await prisma.customer.update({ 
        data: { isDeleted: true },
        where: 
        { 
            id: parseInt(request.params.id),
            isDeleted: false
        } 
    });

    response.status(200).send();
}
