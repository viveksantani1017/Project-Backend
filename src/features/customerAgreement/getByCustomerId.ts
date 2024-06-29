import { Request, Response } from "express";

import prisma from "../../utils/database";

export async function handle(request: Request, response: Response) {
    const customerAgreements = await prisma.customerAgreements.findMany({
        where: {
            customerId: parseInt(request.params.id),
            isDeleted: false,
        },
    });

    if (!customerAgreements) {
        response.status(404).send();
        return;
    }

    response.status(200).json({ customerAgreements: customerAgreements });
}
