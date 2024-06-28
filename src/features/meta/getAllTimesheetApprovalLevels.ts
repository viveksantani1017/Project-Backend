import { Request, Response } from "express";

import prisma from "../../utils/database";

export async function handle(_: Request, response: Response) {
    const timesheetApprovalLevels = await prisma.timesheetApprovalLevel.findMany({
        where: { isDeleted: false },
        select:{
            id: true,
            name: true,
        }
    });
    response.status(200).json({ timesheetApprovalLevels: timesheetApprovalLevels });
}
