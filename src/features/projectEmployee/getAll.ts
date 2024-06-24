import { Request, Response } from "express";

import prisma from "../../utils/database";

export async function handle(_: Request, response: Response) {
    const projectEmployees = await prisma.projectEmployee.findMany({
        include: {
            accountDetails: true,
            allocationType: {
                select: {
                    name: true,
                },
            },
            Employee:{
                select:{
                    name:true
                }
            },
            modeOfPayment: {
                select: {
                    name: true,
                },
            },
            Project:{
                select:{
                    projectCode:true
                }
            },
            technology:{
                select:{
                    name:true
                }
            },
            timesheetType:{
                select:{
                    name:true
                }
            }
        },
        where: { isDeleted: false },
        orderBy: { id: "desc" },
    });

    const modifiedProjectEmployees = projectEmployees.map(projectEmployee => ({
        ...projectEmployee,
        employeeName: projectEmployee.Employee.name,
        allocationTypeName: projectEmployee.allocationType.name,
        modeOfPaymentName: projectEmployee.modeOfPayment.name,
        projectName: projectEmployee.Project.projectCode,
        technologyName: projectEmployee.technology.name,
        timesheetTypeName: projectEmployee.timesheetType.name,
        company: undefined, // Remove the nested company object
        Employee: undefined, // Remove the nested Employee object
        modeOfPayment: undefined, // Remove the nested modeOfPayment object
        Project: undefined, // Remove the nested Project object
        technology: undefined, // Remove the nested technology object
        timesheetType: undefined, // Remove the nested timesheetType object
        allocationType: undefined, // Remove the nested allocationType object
    }));



    response.status(200).json({ projectEmployees: modifiedProjectEmployees });
}
