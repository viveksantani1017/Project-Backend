import { Request, Response } from "express";

import prisma from "../../utils/database";

export async function handle(request: Request, response: Response)
{
    const count = await prisma.company.findFirst({ 
        where: 
        { 
            id: parseInt(request.params.id),
            isDeleted: false
        } 
    });

    if (count === null)
    {
        response.status(404).json({ error: "Company not found" });
        return;
    }

    await prisma.company.update({ 
        data: { isDeleted: true },
        where: 
        { 
            id: parseInt(request.params.id),
            isDeleted: false
        } 
    });

    if(count.accountDetailsId != null){
        await prisma.accountDetails.update({ 
            data: { isDeleted: true },
            where: 
            { 
                id: count.accountDetailsId,
                isDeleted: false
            } 
        });
    }


    response.status(200).send();
}
