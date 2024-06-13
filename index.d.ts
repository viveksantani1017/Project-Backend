import { User } from "./src/utils/types";

declare module "express-serve-static-core" 
{
    interface Request
    {
        user?: User;
    }
}
