import { Request, Response } from "express";

import prisma from "../../utils/database";

export async function handle(request: Request, response: Response)
{
    const project = await prisma.project.findFirst({ 
        include:{customer:true,projectEmployee:true,timesheetApprovalLevel:true},
        where: 
        { 
            id: parseInt(request.params.id),
            isDeleted: false
        } 
    });
    
    if (!project)
    {
        response.status(404).send();
        return;
    }
    
    response.status(200).json({ project: project });
}
