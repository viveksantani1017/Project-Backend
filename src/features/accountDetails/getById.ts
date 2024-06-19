import { Request, Response } from "express";

import prisma from "../../utils/database";

export async function handle(request: Request, response: Response) {
    const accountDetail = await prisma.accountDetails.findFirst({
        where: {
            id: parseInt(request.params.id),
            isDeleted: false,
        },
    });

    if (!accountDetail) {
        response.status(404).send();
        return;
    }

    response.status(200).json({ accountDetail: accountDetail });
}
