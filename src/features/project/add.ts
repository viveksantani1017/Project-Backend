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

    await prisma.project.create({ data: customRequest as any });

    logger.info("Project Added");
    response.status(200).send();
}