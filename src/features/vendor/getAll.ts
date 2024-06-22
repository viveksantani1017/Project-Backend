import { Request, Response } from "express";

import prisma from "../../utils/database";

export async function handle(_: Request, response: Response)
{
    const vendors = await prisma.vendor.findMany({include:{accountDetails:true,company:true,employee:true}, where: { isDeleted: false} });
    response.status(200).json({ vendors: vendors });
}
