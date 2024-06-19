import { Request, Response } from "express";
import Joi from "joi";

import prisma from "../../utils/database";
import logger from "../../utils/logger";

interface CustomRequest {
    companyCode: string;
    companyName: string;
    companyAddress: string;
    gstn: string;
    panCardNumber: string;
    contactPersonName: string;
    contactPersonNumber: string;
    paymentTerms: string;
    bankName: String;
    accountName: String;
    accountNumber: String;
    ifscCode: String;
    micr: String;
    cancelledChequeImageName: String;
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
    accountNumber: Joi.string().required(),
    ifscCode: Joi.string().required(),
    micr: Joi.string().required(),
    cancelledChequeImageName: Joi.string().required(),
});

export async function handle(request: Request, response: Response) {
    const requestData = {
        ...request.body,
        cancelledChequeImageName: request.file?.filename,
    };
    if (!requestData.cancelledChequeImageName)
        return response
            .status(400)
            .json({ error: "Cancelled Cheque Image is required" });
    const customRequest = requestData as CustomRequest;
    const { error } = validator.validate(customRequest);
    if (error) response.status(400).json({ error: error.message });

    const accountDetails = await prisma.accountDetails.create({
        data: {
            bankName: customRequest.bankName,
            accountName: customRequest.accountName,
            accountNumber: customRequest.accountNumber,
            ifscCode: customRequest.ifscCode,
            micr: customRequest.micr,
            cancelledChequeImageName: customRequest.cancelledChequeImageName,
        } as any,
    });

    await prisma.company.create({
        data: {
            companyCode: customRequest.companyCode,
            companyName: customRequest.companyName,
            companyAddress: customRequest.companyAddress,
            gstn: customRequest.gstn,
            panCardNumber: customRequest.panCardNumber,
            contactPersonName: customRequest.contactPersonName,
            contactPersonNumber: customRequest.contactPersonNumber,
            paymentTerms: customRequest.paymentTerms,
            accountDetailsId: accountDetails.id,
        } as any,
    });

    logger.info("Company added");
    response.status(200).send();
}
