import { Request, Response } from "express";

import prisma from "../../utils/database";

export async function handle(_: Request, response: Response)
{
    const employees = await prisma.employee.findMany({ where: { isDeleted: false} });
    response.status(200).json({ employees: employees });
}
