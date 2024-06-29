import { Request, Response } from "express";

import prisma from "../../utils/database";

export async function handle(_: Request, response: Response)
{
    const vendorAgreements = await prisma.vendorAgreements.findMany({where: { isDeleted: false} });
    response.status(200).json({ vendorAgreements: vendorAgreements });
}
