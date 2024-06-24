import { Request, Response } from "express";

import prisma from "../../utils/database";

export async function handle(_: Request, response: Response) {
    const customers = await prisma.customer.findMany({
        include: { company: {
            select:{companyName: true}
        }, project: true, customerAgreements: true },
        where: { isDeleted: false },
    });

    const modifiedCustomers = customers.map(customer => ({
        ...customer,
        companyName: customer.company.companyName,
        company: undefined, // Remove the nested company object
    }));

    response.status(200).json({ customers: modifiedCustomers });
}
