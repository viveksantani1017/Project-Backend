import dotenv from "dotenv";
import express, { Request, Response } from "express";

import exceptionHandler from "./middleware/exceptionHandler";
import requestLogger from "./middleware/requestLogger";

import accountDetailsRouter from "./features/accountDetails/@routes";
import companiesRouter from "./features/companies/@routes";
import customerRouter from "./features/customer/@routes";
import customerAgreementRouter from "./features/customerAgreement/@routes";
import employeeRouter from "./features/employee/@routes";
import projectRouter from "./features/project/@routes";
import vendorRouter from "./features/vendor/@routes";
import vendorAgreementRouter from "./features/vendorAgreement/@routes";
import projectEmployeeRouter from "./features/projectEmployee/@routes";
import metaRouter from "./features/meta/@routes";

const cors = require('cors')

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const corsOption = {
    credentials: true,
    origin: ['http://localhost:3000']
}

app.use(cors(corsOption));

app.use(requestLogger);
app.use(express.json());

// Endpoints

app.use('/api/accountDetails', accountDetailsRouter);
app.use('/api/images', express.static('uploads'));
app.use('/api/companies', companiesRouter);
app.use('/api/customer', customerRouter);
app.use('/api/customerAgreement', customerAgreementRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/project', projectRouter);
app.use('/api/vendor', vendorRouter);
app.use('/api/vendorAgreement', vendorAgreementRouter);
app.use('/api/projectEmployee', projectEmployeeRouter);
app.use('/api/meta', metaRouter);


// MUST BE LAST!
app.use(exceptionHandler);

app.listen(port, () =>
{
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
