import { Request, Response } from "express";
import Joi from "joi";

import prisma from "../../utils/database";
import logger from "../../utils/logger";

interface CustomRequest {
    companyId: number;
    name: string;
    address: string;
    country: string;
    gstn: string;
    panCardNumber: string;
    contactPersonName: string;
    contactPersonNumber: string;
    paymentTerms: string;
    agreementFileName1?: string;
    agreementFileName2?: string;
    agreementFileName3?: string;
    agreementFileName4?: string;
}

const validator = Joi.object({
    companyId: Joi.number().required(),
    name: Joi.string().required(),
    address: Joi.string().required(),
    country: Joi.string().required(),
    gstn: Joi.string().required(),
    panCardNumber: Joi.string().required(),
    contactPersonName: Joi.string().required(),
    contactPersonNumber: Joi.string().required(),
    paymentTerms: Joi.string().required(),
    agreementFileName1: Joi.string().optional(),
    agreementFileName2: Joi.string().optional(),
    agreementFileName3: Joi.string().optional(),
    agreementFileName4: Joi.string().optional(),
});

export async function handle(request: Request, response: Response) {
    const customRequest = request.body as CustomRequest;
    if (!customRequest.agreementFileName1 || !customRequest.agreementFileName2 || !customRequest.agreementFileName3 || !customRequest.agreementFileName4)
        return response
            .status(400)
            .json({ error: "Agreement Files are required" });
    const { error } = validator.validate(customRequest);
    if (error) response.status(400).json({ error: error.message });

    const customer = await prisma.customer.create({
        data:{
            companyId: Number(customRequest.companyId),
            name: customRequest.name,
            address: customRequest.address,
            country: customRequest.country,
            gstn: customRequest.gstn,
            panCardNumber: customRequest.panCardNumber,
            contactPersonName: customRequest.contactPersonName,
            contactPersonNumber: customRequest.contactPersonNumber,
            paymentTerms: customRequest.paymentTerms,
        }
    });

    let agreements:any = [
        {
            agreementFilename: customRequest.agreementFileName1,
            customerId: customer.id,
        },
        {
            agreementFilename: customRequest.agreementFileName2,
            customerId: customer.id,
        },
        {
            agreementFilename: customRequest.agreementFileName3,
            customerId: customer.id,
        },
        {
            agreementFilename: customRequest.agreementFileName4,
            customerId: customer.id,
        },
    ]
    
      await Promise.all(
        agreements.map(async (agreement:any) => {
          await prisma.customerAgreements.create({
            data: agreement as any,
          })
        })
      )
    
    logger.info("Customer Added");
    response.status(200).send();
}
