import { Request, Response } from "express";

import prisma from "../../utils/database";

export async function handle(request: Request, response: Response) {
    const projectEmployee = await prisma.projectEmployee.findFirst({
        include: {
            accountDetails: true,
            allocationType: {
                select: {
                    name: true,
                },
            },
            Employee: {
                select: {
                    name: true,
                },
            },
            modeOfPayment: {
                select: {
                    name: true,
                },
            },
            Project: {
                select: {
                    projectCode: true,
                },
            },
            technology: {
                select: {
                    name: true,
                },
            },
            timesheetType: {
                select: {
                    name: true,
                },
            },
        },
        where: {
            id: parseInt(request.params.id),
            isDeleted: false,
        },
    });

    if (!projectEmployee) {
        response.status(404).send();
        return;
    }

    const modifiedProjectEmployee = {
        ...projectEmployee,
        employeeName: projectEmployee.Employee.name,
        allocationTypeName: projectEmployee.allocationType.name,
        modeOfPaymentName: projectEmployee.modeOfPayment.name,
        projectName: projectEmployee.Project.projectCode,
        technologyName: projectEmployee.technology.name,
        timesheetTypeName: projectEmployee.timesheetType.name,
        company: undefined, 
        Employee: undefined, 
        modeOfPayment: undefined,
        Project: undefined, 
        technology: undefined, 
        timesheetType: undefined, 
        allocationType: undefined, 

    };

    response.status(200).json({ projectEmployee: modifiedProjectEmployee });
}
