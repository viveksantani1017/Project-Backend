import dotenv from "dotenv";
import express, { Request, Response } from "express";

import exceptionHandler from "./middleware/exceptionHandler";
import requestLogger from "./middleware/requestLogger";

import companiesRouter from "./features/companies/@routes";
import employeeRouter from "./features/employee/@routes";
import customerRouter from "./features/customer/@routes";
import vendorRouter from "./features/vendor/@routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(requestLogger);
app.use(express.json());

// Endpoints
app.use('/api/companies', companiesRouter);
app.use('/api/customer', customerRouter);
app.use('/api/vendor', vendorRouter);
app.use('/api/employee', employeeRouter);

// MUST BE LAST!
app.use(exceptionHandler);

app.listen(port, () =>
{
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
