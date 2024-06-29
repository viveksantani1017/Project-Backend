import { Request, Response } from "express";

import prisma from "../../utils/database";

export async function handle(_: Request, response: Response)
{
    const customerAgreements = await prisma.customerAgreements.findMany({where: { isDeleted: false} });
    response.status(200).json({ customerAgreements: customerAgreements });
}
