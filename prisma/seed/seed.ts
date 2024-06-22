import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function seedRecords() {
    Promise.all(
        ["C2H", "Freelancing", "Permanent", "Client Payroll", "Commission"].map(
            (n) => prisma.employeeType.create({ data: { name: n } })
        )
    )
        .then(() =>
            console.info("[SEED] Succussfully created Employee Type records")
        )
        .catch((e) =>
            console.error("[SEED] Failed to create Employee Type records", e)
        );

    Promise.all(
        ["EU", "INDIA", "US", "AU"].map((n) =>
            prisma.timingAvailabilty.create({ data: { name: n } })
        )
    )
        .then(() =>
            console.info(
                "[SEED] Succussfully created Timing Availabilty records"
            )
        )
        .catch((e) =>
            console.error(
                "[SEED] Failed to create Timing Availabilty records",
                e
            )
        );

    Promise.all(
        ["One", "Two"].map((n) =>
            prisma.timesheetApprovalLevel.create({ data: { name: n } })
        )
    )
        .then(() =>
            console.info(
                "[SEED] Succussfully created Timesheet Approval Level records"
            )
        )
        .catch((e) =>
            console.error(
                "[SEED] Failed to create Timesheet Approval Level records",
                e
            )
        );

    Promise.all(
        ["SAP", "NON SAP"].map((n) =>
            prisma.technology.create({ data: { name: n } })
        )
    )
        .then(() =>
            console.info("[SEED] Succussfully created Technology records")
        )
        .catch((e) =>
            console.error("[SEED] Failed to create Technology records", e)
        );

    Promise.all(
        ["Fixed", "T&M", "Monthly", "50% Allocation"].map((n) =>
            prisma.allocationType.create({ data: { name: n } })
        )
    )
        .then(() =>
            console.info("[SEED] Succussfully created Allocation Type records")
        )
        .catch((e) =>
            console.error("[SEED] Failed to create Allocation Type records", e)
        );

    Promise.all(
        ["Monthly", "Quarterly", "Project Based"].map((n) =>
            prisma.timesheetType.create({ data: { name: n } })
        )
    )
        .then(() =>
            console.info("[SEED] Succussfully created Timesheet Type records")
        )
        .catch((e) =>
            console.error("[SEED] Failed to create Timesheet Type records", e)
        );

    Promise.all(
        ["Online", "Cash", "UPI (Configurable)"].map((n) =>
            prisma.modeOfPayment.create({ data: { name: n } })
        )
    )
        .then(() =>
            console.info("[SEED] Succussfully created Mode Of Payment records")
        )
        .catch((e) =>
            console.error("[SEED] Failed to create Mode Of Payment records", e)
        );
}

seedRecords();
