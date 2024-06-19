import { Request, Response } from "express";
import Joi from "joi";

import prisma from "../../utils/database";
import logger from "../../utils/logger";

interface CustomRequest
{
    companyCode: string;
    companyName: string;
    companyAddress: string;
    gstn: string;
    panCardNumber: string;
    contactPersonName: string;
    contactPersonNumber: string;
    paymentTerms: string;
}

const validator = Joi.object({
    companyCode: Joi.string().required(),
    companyName: Joi.string().required(),
    companyAddress: Joi.string().required(),
    gstn: Joi.string().required(),
    panCardNumber: Joi.string().required(),
    contactPersonName: Joi.string().required(),
    contactPersonNumber: Joi.string().required(),
    paymentTerms: Joi.string().required()
});

export async function handle(request: Request, response: Response)
{
    const customRequest = request.body as CustomRequest;
    const { error } = validator.validate(customRequest);
    if (error)
        response.status(400).json({ error: error.message });

    const count = await prisma.company.count({ 
        where: 
        { 
            id: parseInt(request.params.id),
            isDeleted: false
        } 
    });

    if (count == 0)
    {
        response.status(404).json({ error: "Company not found" });
        return;
    }

    await prisma.company.update({ 
        data: customRequest as any,
        where: { id: parseInt(request.params.id) }
    });

    logger.info(`Company with id ${request.params.id} updated`);
    response.status(200).send();
}
