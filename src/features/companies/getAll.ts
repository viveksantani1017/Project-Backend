import { Request, Response } from "express";

import prisma from "../../utils/database";

export async function handle(_: Request, response: Response) {
    const companies = await prisma.company.findMany({
        include: {
            accountDetails: true,
            customer: true,
            employee: true,
            vendor: true,
        },
        where: { isDeleted: false },
        orderBy: { id: "desc" },
    });
    response.status(200).json({ companies: companies });
}
