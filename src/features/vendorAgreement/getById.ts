import { Request, Response } from "express";

import prisma from "../../utils/database";

export async function handle(request: Request, response: Response) {
    const vendorAgreement = await prisma.vendorAgreements.findFirst({
        where: {
            id: parseInt(request.params.id),
            isDeleted: false,
        },
    });

    if (!vendorAgreement) {
        response.status(404).send();
        return;
    }

    response.status(200).json({ vendorAgreement: vendorAgreement });
}
