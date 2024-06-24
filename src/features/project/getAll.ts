import { Request, Response } from "express";

import prisma from "../../utils/database";

export async function handle(_: Request, response: Response) {
    const projects = await prisma.project.findMany({
        include: {
            customer: {
                select: { name: true },
            },
            projectEmployee: true,
            timesheetApprovalLevel: {
                select: { name: true },
            },
        },
        where: { isDeleted: false },
    });

    const modifiedProjects = projects.map(project => ({
        ...project,
        customerName: project.customer.name,
        timesheetApprovalLevelName: project.timesheetApprovalLevel.name,
        customer: undefined, // Remove the nested customer object
        timesheetApprovalLevel: undefined, // Remove the nested timesheetApprovalLevel object
    }));

    response.status(200).json({ vendors: modifiedProjects });
}
