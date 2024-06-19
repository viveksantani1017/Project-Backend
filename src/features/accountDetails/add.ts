import { Request, Response } from "express";
import Joi from "joi";

import prisma from "../../utils/database";
import logger from "../../utils/logger";

interface CustomRequest {
    bankName: String;
    accountName: String;
    accountNumber: String;
    ifscCode: String;
    micr: String;
    cancelledChequeImageName: String;
}

const validator = Joi.object({
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

    await prisma.accountDetails.create({
        data: requestData as any,
    });

    

    logger.info("Account Details added");
    response.status(200).send();
}
