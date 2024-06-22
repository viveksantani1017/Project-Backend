import { Request, Response } from "express";

import prisma from "../../utils/database";

export async function handle(_: Request, response: Response)
{
    const projects = await prisma.project.findMany({ include:{customer:true,projectEmployee:true,timesheetApprovalLevel:true}, where: { isDeleted: false} });
    response.status(200).json({ projects: projects });
}
