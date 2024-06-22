import { Request, Response } from "express";

import prisma from "../../utils/database";

export async function handle(request: Request, response: Response)
{
    const count = await prisma.employee.count({ 
        where: 
        { 
            id: parseInt(request.params.id),
            isDeleted: false
        } 
    });

    if (count == 0)
    {
        response.status(404).json({ error: "Employee not found" });
        return;
    }

    await prisma.employee.update({ 
        data: { isDeleted: true },
        where: 
        { 
            id: parseInt(request.params.id),
            isDeleted: false
        } 
    });

    response.status(200).send();
}
