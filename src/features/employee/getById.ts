import { Request, Response } from "express";

import prisma from "../../utils/database";

export async function handle(request: Request, response: Response) {
    const employee = await prisma.employee.findFirst({
        include: {
            accountDetails: true,
            additionalAccountDetails: true,
            company: {
                select: { companyName: true },
            },
            employeeType: {
                select: { name: true },
            },
            projectEmployee: true,
            timingAvailabilty: {
                select: { name: true },
            },
            vendor: {
                select: { vendorName: true },
            },
        },
        where: {
            id: parseInt(request.params.id),
            isDeleted: false,
        },
    });

    if (!employee) {
        response.status(404).send();
        return;
    }

    const modifiedEmployee = {
        ...employee,
        companyName: employee.company.companyName,
        employeeTypeName: employee.employeeType.name,
        timingAvailabiltyName: employee.timingAvailabilty.name,
        vendorName: employee.vendor.vendorName,
        company: undefined,
        employeeType: undefined,
        timingAvailabilty: undefined,
        vendor: undefined,    
    };
    response.status(200).json({ employee: modifiedEmployee });
}
