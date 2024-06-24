import { Request, Response } from "express";
import Joi from "joi";

import prisma from "../../utils/database";
import logger from "../../utils/logger";

interface CustomRequest {
    projectId:number,      
    employeeId:number,      
    technologyId:number,      
    allocationTypeId:number,      
    consultantRate:string,   
    rateUnit:string,   
    timesheetTypeId:number,      
    sapModule:string,   
    employeeStartDate:Date, 
    employeeEndDate:Date, 
    timesheetCycleStartDay:number,     
    timesheetCycleEndDay:number,     
    modeOfPaymentId:number,      
    revenue:number,   
    inactive:Boolean,  
    salaryPaymentDays:number,     
    tds:number,   
    bankName: string;
    accountName: string;
    accountNumber: string;
    ifscCode: string;
    micr: string;
    cancelledChequeImageName: string;
}

const validator = Joi.object({
    projectId:Joi.number().required(),      
    employeeId:Joi.number().required(),      
    technologyId:Joi.number().required(),      
    allocationTypeId:Joi.number().required(),      
    consultantRate:Joi.string().required(),   
    rateUnit:Joi.string().required(),   
    timesheetTypeId:Joi.number().required(),      
    sapModule:Joi.string().required(),   
    employeeStartDate:Joi.date().required(), 
    employeeEndDate:Joi.date().required(), 
    timesheetCycleStartDay:Joi.number().required(),     
    timesheetCycleEndDay:Joi.number().required(),     
    modeOfPaymentId:Joi.number().required(),      
    revenue:Joi.number().required(),   
    inactive:Joi.boolean().required(),  
    salaryPaymentDays:Joi.number().required(),     
    tds:Joi.number().required(),   
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

    await prisma.projectEmployee.create({
        data: {
            projectId: Number(customRequest.projectId),
            employeeId: Number(customRequest.employeeId),
            technologyId: Number(customRequest.technologyId),
            allocationTypeId: Number(customRequest.allocationTypeId),
            consultantRate: customRequest.consultantRate,
            rateUnit: customRequest.rateUnit,
            timesheetTypeId: Number(customRequest.timesheetTypeId),
            sapModule: customRequest.sapModule,
            employeeStartDate: customRequest.employeeStartDate,
            employeeEndDate: customRequest.employeeEndDate,
            timesheetCycleStartDay: Number(customRequest.timesheetCycleStartDay),
            timesheetCycleEndDay: Number(customRequest.timesheetCycleEndDay),
            modeOfPaymentId: Number(customRequest.modeOfPaymentId),
            revenue: Number(customRequest.revenue),
            inactive: Boolean(customRequest.inactive),
            salaryPaymentDays: Number(customRequest.salaryPaymentDays),
            tds: Number(customRequest.tds),
            accountDetailsId: accountDetails.id,
        } as any,
    });

    logger.info("Project Employee added");
    response.status(200).send();
}
