import { Request, Response } from "express";

import prisma from "../../utils/database";

export async function handle(request: Request, response: Response) {
    const customer = await prisma.customer.findFirst({
        include: {
            company: {
                select: { companyName: true },
            },
            project: true,
            customerAgreements: true,
        },
        where: {
            id: parseInt(request.params.id),
            isDeleted: false,
        },
    });

    if (!customer) {
        response.status(404).send();
        return;
    }
    const modifiedCustomer = {
        ...customer,
        companyName: customer.company.companyName,
        company: undefined,
    };
    response.status(200).json({ customer: modifiedCustomer });
}
