import { Request, Response } from "express";
import Joi from "joi";

import prisma from "../../utils/database";
import logger from "../../utils/logger";

interface CustomRequest
{
    employeeType:string,
    companyCode:string,
    resumeMasterNumber:number,
    name:string,
    alternativeName:string,
    age:number,
    skillSet:string,
    experience:number,
    timing:string,
    contactNumber1:string,
    contactNumber2:string,
    remarks:string,
    referredBy:string,
    createdBy:string,
    ndaUpload:string,
    vendorProfiles:string
}

const validator = Joi.object({

    employeeType:Joi.string().required(),
    companyCode:Joi.string().required(),
    resumeMasterNumber:Joi.number().required(),
    name:Joi.string().required(),
    alternativeName:Joi.string().required(),
    age:Joi.number().required(),
    skillSet:Joi.string().required(),
    experience:Joi.number().required(),
    timing:Joi.string().required(),
    contactNumber1:Joi.string().required(),
    contactNumber2:Joi.string().required(),
    remarks:Joi.string().required(),
    referredBy:Joi.string().required(),
    createdBy:Joi.string().required(),
    ndaUpload:Joi.string().required(),
    vendorProfiles:Joi.string().required()
});

export async function handle(request: Request, response: Response)
{
    const customRequest = request.body as CustomRequest;
    const { error } = validator.validate(customRequest);
    if (error)
        response.status(400).json({ error: error.message });

    await prisma.employee.create({ data: customRequest as any });

    logger.info("Employee added");
    response.status(200).send();
}
