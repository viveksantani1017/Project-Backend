import { Request, Response } from "express";

import prisma from "../../utils/database";

export async function handle(request: Request, response: Response)
{
    const employee = await prisma.employee.findFirst({ 
        where: 
        { 
            id: parseInt(request.params.id),
            isDeleted: false
        } 
    });
    
    if (!employee)
    {
        response.status(404).send();
        return;
    }
    
    response.status(200).json({ employee: employee });
}
