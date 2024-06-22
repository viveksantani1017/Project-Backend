import { Request, Response } from "express";
import Joi from "joi";

import prisma from "../../utils/database";
import logger from "../../utils/logger";

interface CustomRequest
{
    projectCode:string,
    projectDescription:string,
    projectStartDate:Date,
    projectEndDate:Date,
    projectCustomerID:number,
    customerRate:string,
    rateUnit:string,
    HSCode:string,
    textFields:string,
    timesheetApprovalLevelID:number,
}

const validator = Joi.object({
    projectCode:Joi.string().required(),
    projectDescription:Joi.string().required(),
    projectStartDate:Joi.date().required(),
    projectEndDate:Joi.date().required(),
    projectCustomerID:Joi.number().required(),
    customerRate:Joi.string().required(),
    rateUnit:Joi.string().required(),
    HSCode:Joi.string().required(),
    textFields:Joi.string().required(),
    timesheetApprovalLevelID:Joi.number().required(),
});

export async function handle(request: Request, response: Response)
{
    const customRequest = request.body as CustomRequest;
    const { error } = validator.validate(customRequest);
    if (error)
        response.status(400).json({ error: error.message });

    const count = await prisma.project.count({ 
        where: 
        { 
            id: parseInt(request.params.id),
            isDeleted: false
        } 
    });

    if (count == 0)
    {
        response.status(404).json({ error: "Project not found" });
        return;
    }

    await prisma.project.update({ 
        data: customRequest as any,
        where: { id: parseInt(request.params.id) }
    });

    logger.info(`project with id ${request.params.id} updated`);
    response.status(200).send();
}
