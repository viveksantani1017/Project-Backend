import { Request, Response } from "express";
import Joi from "joi";

import prisma from "../../utils/database";
import logger from "../../utils/logger";

interface CustomRequest
{
    employeeTypeId:number,
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

    employeeTypeId: Joi.number().required(),
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

    const count = await prisma.employee.count({ 
        where: 
        { 
            id: parseInt(request.params.id),
            isDeleted: false
        } 
    });

    if (count == 0)
    {
        response.status(404).json({ error: "Employee not found" });
        return;
    }

    await prisma.employee.update({ 
        data: customRequest as any,
        where: { id: parseInt(request.params.id) }
    });

    logger.info(`Employee with id ${request.params.id} updated`);
    response.status(200).send();
}
