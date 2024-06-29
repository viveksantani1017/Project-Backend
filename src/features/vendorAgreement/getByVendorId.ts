import { Request, Response } from "express";

import prisma from "../../utils/database";

export async function handle(request: Request, response: Response) {
    const vendorAgreements = await prisma.vendorAgreements.findMany({
        where: {
            vendorId: parseInt(request.params.id),
            isDeleted: false,
        },
    });

    if (!vendorAgreements) {
        response.status(404).send();
        return;
    }

    response.status(200).json({ vendorAgreements: vendorAgreements });
}
