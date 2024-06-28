import { Request, Response } from "express";

import prisma from "../../utils/database";

export async function handle(_: Request, response: Response) {
    const timesheetTypes = await prisma.timesheetType.findMany({
        where: { isDeleted: false },
        select:{
            id: true,
            name: true,
        }
    });
    response.status(200).json({ timesheetTypes: timesheetTypes });
}
