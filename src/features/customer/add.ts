import { Request, Response } from "express";
import Joi from "joi";

import prisma from "../../utils/database";
import logger from "../../utils/logger";

interface CustomRequest
{
    customerCode: string,
    customerName: string,
    customerAddress: string,
    gstn: string,
    panCardNumber: string,
    contactPersonName: string,
    contactPersonNumber: string,
    paymentTerms: string,
}

const validator = Joi.object({
    customerCode: Joi.string().required(),
    customerName: Joi.string().required(),
    customerAddress: Joi.string().required(),
    country: Joi.string().required(),
    gstn: Joi.string().required(),
    panCardNumber: Joi.string().required(),
    contactPersonName: Joi.string().required(),
    contactPersonNumber: Joi.string().required(),
    paymentTerms: Joi.string().required(),
});

export async function handle(request: Request, response: Response)
{
    console.log("In Req");
    const customRequest = request.body as CustomRequest;
    const { error } = validator.validate(customRequest);
    if (error)
        response.status(400).json({ error: error.message });

    await prisma.customer.create({ data: customRequest as any });

    logger.info("Customer Added");
    response.status(200).send();
}