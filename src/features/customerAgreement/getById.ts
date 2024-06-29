import { Request, Response } from "express";

import prisma from "../../utils/database";

export async function handle(request: Request, response: Response) {
    const customerAgreement = await prisma.customerAgreements.findFirst({
        where: {
            id: parseInt(request.params.id),
            isDeleted: false,
        },
    });

    if (!customerAgreement) {
        response.status(404).send();
        return;
    }

    response.status(200).json({ customerAgreement: customerAgreement });
}
