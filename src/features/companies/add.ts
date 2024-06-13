import { Request, Response } from "express";
import Joi from "joi";

import prisma from "../../utils/database";
import logger from "../../utils/logger";

interface CustomRequest
{
    companyCode: string,
    companyName: string,
    companyAddress: string,
    gstn: string,
    panCardNumber: string,
    contactPersonName: string,
    contactPersonNumber: string,
    paymentTerms: string,
    bankName: string,
    accountName: string,
    bankAccountNumber: string,
    ifscCode: string,
    micr: string,
}

const validator = Joi.object({
    companyCode: Joi.string().required(),
    companyName: Joi.string().required(),
    companyAddress: Joi.string().required(),
    gstn: Joi.string().required(),
    panCardNumber: Joi.string().required(),
    contactPersonName: Joi.string().required(),
    contactPersonNumber: Joi.string().required(),
    paymentTerms: Joi.string().required(),
    bankName: Joi.string().required(),
    accountName: Joi.string().required(),
    bankAccountNumber: Joi.string().required(),
    ifscCode: Joi.string().required(),
    micr: Joi.string().required(),
});

export async function handle(request: Request, response: Response)
{
    const customRequest = request.body as CustomRequest;
    const { error } = validator.validate(customRequest);
    if (error)
        response.status(400).json({ error: error.message });

    await prisma.company.create({ data: customRequest as any });

    logger.info("Company added");
    response.status(200).send();
}
