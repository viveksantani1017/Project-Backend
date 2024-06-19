import dotenv from "dotenv";
import express, { Request, Response } from "express";

import exceptionHandler from "./middleware/exceptionHandler";
import requestLogger from "./middleware/requestLogger";

import companiesRouter from "./features/companies/@routes";
import accountDetailsRouter from "./features/accountDetails/@routes";


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(requestLogger);
app.use(express.json());

// Endpoints
app.use('/api/companies', companiesRouter);
app.use('/api/accountDetails', accountDetailsRouter);


// MUST BE LAST!
app.use(exceptionHandler);

app.listen(port, () =>
{
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
