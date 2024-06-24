import { Request, Response } from "express";

import prisma from "../../utils/database";

export async function handle(request: Request, response: Response) {
    const company = await prisma.company.findFirst({
        include: {
            accountDetails: true,
            customer: true,
            employee: true,
            vendor: true,
        },
        where: {
            id: parseInt(request.params.id),
            isDeleted: false,
        },
    });

    if (!company) {
        response.status(404).send();
        return;
    }

    response.status(200).json({ company: company });
}
