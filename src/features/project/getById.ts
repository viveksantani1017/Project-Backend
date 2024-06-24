import { Request, Response } from "express";

import prisma from "../../utils/database";

export async function handle(request: Request, response: Response)
{
    const project = await prisma.project.findFirst({ 
        include: {
            customer: {
                select: { name: true },
            },
            projectEmployee: true,
            timesheetApprovalLevel: {
                select: { name: true },
            },
        },
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
    
    const modifiedProject = {
        ...project,
        customerName: project.customer.name,
        timesheetApprovalLevelName: project.timesheetApprovalLevel.name,
        customer: undefined,
        timesheetApprovalLevel: undefined,
    };

    response.status(200).json({ project: modifiedProject });
}
