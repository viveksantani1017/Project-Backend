import { Request, Response } from "express";
import Joi from "joi";

import prisma from "../../utils/database";
import logger from "../../utils/logger";

interface CustomRequest {
    agreementFilename?: string;
}

const validator = Joi.object({
    agreementFilename: Joi.string().optional(),
});

export async function handle(request: Request, response: Response) {
    const customRequest = request.body as CustomRequest;
    const { error } = validator.validate(customRequest);
    if (error) response.status(400).json({ error: error.message });

    const requsetData = {...customRequest, customerId: Number(request.params.id)};
    await prisma.customerAgreements.create({
        data: requsetData as any,
    });

    logger.info("Customer Agreement added");
    response.status(200).send();
}
