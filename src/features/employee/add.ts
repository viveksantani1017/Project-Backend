import { Request, Response } from "express";
import Joi from "joi";

import prisma from "../../utils/database";
import logger from "../../utils/logger";

interface CustomRequest {
    employeeTypeId: number;
    companyId: number;
    resumeMasterNumber: number;
    name: string;
    alternativeName: string;
    age: number;
    skillSet: string;
    experience: number;
    timingAvailabiltyId: number;
    contactNumber1: string;
    contactNumber2: string;
    remarks: string;
    referredBy: string;
    createdBy: string;
    ndaUpload: string;
    vendorId: number;
    additionalAccountDetailsId: number;
    bankName: string;
    accountName: string;
    accountNumber: string;
    ifscCode: string;
    micr: string;
    cancelledChequeImageName: string;
}

const validator = Joi.object({
    employeeTypeId: Joi.number().required(),
    companyId: Joi.number().required(),
    resumeMasterNumber: Joi.number().required(),
    name: Joi.string().required(),
    alternativeName: Joi.string().required(),
    age: Joi.number().required(),
    skillSet: Joi.string().required(),
    experience: Joi.number().required(),
    timingAvailabiltyId: Joi.number().required(),
    contactNumber1: Joi.string().required(),
    contactNumber2: Joi.string().required(),
    remarks: Joi.string().required(),
    referredBy: Joi.string().required(),
    createdBy: Joi.string().required(),
    ndaUpload: Joi.string().required(),
    vendorId: Joi.number().required(),
    additionalAccountDetailsId: Joi.number().required(),
    bankName: Joi.string().required(),
    accountName: Joi.string().required(),
    accountNumber: Joi.string().required(),
    ifscCode: Joi.string().required(),
    micr: Joi.string().required(),
    cancelledChequeImageName: Joi.string().required(),
});

export async function handle(request: Request, response: Response) {
    const customRequest = request.body as CustomRequest;
    if (!customRequest.cancelledChequeImageName)
        return response
            .status(400)
            .json({ error: "Cancelled Cheque Image is required" });
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

    await prisma.employee.create({
        data: {
            employeeTypeId: Number(customRequest.employeeTypeId),
            companyId: Number(customRequest.companyId),
            resumeMasterNumber: Number(customRequest.resumeMasterNumber),
            name: customRequest.name,
            alternativeName: customRequest.alternativeName,
            age: Number(customRequest.age),
            skillSet: customRequest.skillSet,
            experience: Number(customRequest.experience),
            timingAvailabiltyId: Number(customRequest.timingAvailabiltyId),
            contactNumber1: customRequest.contactNumber1,
            contactNumber2: customRequest.contactNumber2,
            remarks: customRequest.remarks,
            referredBy: customRequest.referredBy,
            createdBy: customRequest.createdBy,
            ndaUpload: customRequest.ndaUpload,
            vendorId: Number(customRequest.vendorId),
            additionalAccountDetailsId:Number(customRequest.additionalAccountDetailsId),
            accountDetailsId: accountDetails.id,
        } as any,
    });

    logger.info("Employee added");
    response.status(200).send();
}
