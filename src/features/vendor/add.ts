import { Request, Response } from "express";
import Joi from "joi";

import prisma from "../../utils/database";
import logger from "../../utils/logger";

interface CustomRequest {
    companyId: number;
    vendorName: string;
    address: string;
    gstn: string;
    panCardNumber: string;
    contactPersonName: string;
    contactPersonNumber: string;
    paymentTerms: string;
    gstnUpload: string;
    pancardUpload: string;
    bankName: String;
    accountName: String;
    accountNumber: String;
    ifscCode: String;
    micr: String;
    cancelledChequeImageName: String;
    agreementFileName1?: string;
    agreementFileName2?: string;
    agreementFileName3?: string;
    agreementFileName4?: string;
}

const validator = Joi.object({
    companyId: Joi.number().required(),
    vendorName: Joi.string().required(),
    address: Joi.string().required(),
    gstn: Joi.string().required(),
    panCardNumber: Joi.string().required(),
    contactPersonName: Joi.string().required(),
    contactPersonNumber: Joi.string().required(),
    paymentTerms: Joi.string().required(),
    gstnUpload: Joi.string().required(),
    pancardUpload: Joi.string().required(),
    bankName: Joi.string().required(),
    accountName: Joi.string().required(),
    accountNumber: Joi.string().required(),
    ifscCode: Joi.string().required(),
    micr: Joi.string().required(),
    cancelledChequeImageName: Joi.string().required(),
    agreementFileName1: Joi.string().optional(),
    agreementFileName2: Joi.string().optional(),
    agreementFileName3: Joi.string().optional(),
    agreementFileName4: Joi.string().optional(),
});

export async function handle(request: Request, response: Response) {
    const customRequest = request.body as CustomRequest;
    if (!customRequest.cancelledChequeImageName)
        return response
            .status(400)
            .json({ error: "Cancelled Cheque Image is required" });
    
    if (
        !customRequest.agreementFileName1 ||
        !customRequest.agreementFileName2 ||
        !customRequest.agreementFileName3 ||
        !customRequest.agreementFileName4
    )
        return response
            .status(400)
            .json({ error: "Agreement Files are required" });
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

    const vendor = await prisma.vendor.create({
        data: {
            companyId: Number(customRequest.companyId),
            vendorName: customRequest.vendorName,
            address: customRequest.address,
            gstn: customRequest.gstn,
            panCardNumber: customRequest.panCardNumber,
            contactPersonName: customRequest.contactPersonName,
            contactPersonNumber: customRequest.contactPersonNumber,
            paymentTerms: customRequest.paymentTerms,
            gstnUpload: customRequest.gstnUpload,
            pancardUpload: customRequest.pancardUpload,
            accountDetailsId: accountDetails.id,
        } as any,
    });

    let agreements:any = [
        {
            agreementFilename: customRequest.agreementFileName1,
            vendorId: vendor.id,
        },
        {
            agreementFilename: customRequest.agreementFileName2,
            vendorId: vendor.id,
        },
        {
            agreementFilename: customRequest.agreementFileName3,
            vendorId: vendor.id,
        },
        {
            agreementFilename: customRequest.agreementFileName4,
            vendorId: vendor.id,
        },
    ]
    
      await Promise.all(
        agreements.map(async (agreement:any) => {
          await prisma.vendorAgreements.create({
            data: agreement as any,
          })
        })
      )
    

    logger.info("Vendor added");
    response.status(200).send();
}
