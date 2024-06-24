import { Request, Response } from "express";

import prisma from "../../utils/database";

export async function handle(_: Request, response: Response) {
    const vendors = await prisma.vendor.findMany({
        include: {
            accountDetails: true,
            company: {
                select: {
                    companyName: true,
                },
            },
            
            employee: true,
            vendorAgreements: true,
        },  
        where: { isDeleted: false },
    });
    
    const modifiedVendors = vendors.map(vendor => ({
        ...vendor,
        companyName: vendor.company.companyName,
        company: undefined, // Remove the nested company object
    }));

    response.status(200).json({ vendors: modifiedVendors });
}
