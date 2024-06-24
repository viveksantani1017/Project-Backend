import { Request, Response } from "express";

import prisma from "../../utils/database";

export async function handle(_: Request, response: Response) {
    const employees = await prisma.employee.findMany({
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
            timingAvailabilty:{
                select:{name:true}
            },
            vendor:{
                select:{vendorName:true}
            }
        },
        where: { isDeleted: false },
    });

    const modifiedEmployees = employees.map(employee => ({
        ...employee,
        companyName: employee.company.companyName,
        employeeTypeName: employee.employeeType.name,
        timingAvailabiltyName: employee.timingAvailabilty.name,
        vendorName: employee.vendor.vendorName,
        company: undefined, 
        employeeType: undefined, 
        timingAvailabilty:undefined,
        vendor:undefined
    }));

    response.status(200).json({ vendors: modifiedEmployees });
}
