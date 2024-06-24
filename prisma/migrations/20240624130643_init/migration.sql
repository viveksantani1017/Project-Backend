-- CreateTable
CREATE TABLE `EmployeeType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TimingAvailabilty` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TimesheetApprovalLevel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Technology` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AllocationType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TimesheetType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ModeOfPayment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AccountDetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bankName` VARCHAR(255) NOT NULL,
    `accountName` VARCHAR(255) NOT NULL,
    `accountNumber` VARCHAR(255) NOT NULL,
    `ifscCode` VARCHAR(255) NOT NULL,
    `micr` VARCHAR(255) NOT NULL,
    `cancelledChequeImageName` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Company` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `companyCode` VARCHAR(255) NOT NULL,
    `companyName` VARCHAR(255) NOT NULL,
    `companyAddress` VARCHAR(255) NOT NULL,
    `gstn` VARCHAR(255) NOT NULL,
    `panCardNumber` VARCHAR(255) NOT NULL,
    `contactPersonName` VARCHAR(255) NOT NULL,
    `contactPersonNumber` VARCHAR(14) NOT NULL,
    `paymentTerms` VARCHAR(500) NOT NULL,
    `accountDetailsId` INTEGER NOT NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Company_accountDetailsId_key`(`accountDetailsId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employeeTypeId` INTEGER NOT NULL,
    `companyId` INTEGER NOT NULL,
    `resumeMasterNumber` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `alternativeName` VARCHAR(255) NOT NULL,
    `age` INTEGER NOT NULL,
    `skillSet` VARCHAR(255) NOT NULL,
    `experience` INTEGER NOT NULL,
    `timingAvailabiltyId` INTEGER NOT NULL,
    `contactNumber1` VARCHAR(14) NOT NULL,
    `contactNumber2` VARCHAR(14) NOT NULL,
    `remarks` VARCHAR(255) NOT NULL,
    `referredBy` VARCHAR(255) NOT NULL,
    `createdBy` VARCHAR(255) NOT NULL,
    `ndaUpload` VARCHAR(255) NOT NULL,
    `vendorId` INTEGER NOT NULL,
    `accountDetailsId` INTEGER NOT NULL,
    `additionalAccountDetailsId` INTEGER NOT NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Employee_vendorId_key`(`vendorId`),
    UNIQUE INDEX `Employee_accountDetailsId_key`(`accountDetailsId`),
    UNIQUE INDEX `Employee_additionalAccountDetailsId_key`(`additionalAccountDetailsId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vendor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `companyId` INTEGER NOT NULL,
    `vendorName` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `gstn` VARCHAR(255) NOT NULL,
    `panCardNumber` VARCHAR(255) NOT NULL,
    `contactPersonName` VARCHAR(255) NOT NULL,
    `contactPersonNumber` VARCHAR(14) NOT NULL,
    `paymentTerms` VARCHAR(500) NOT NULL,
    `gstnUpload` VARCHAR(255) NOT NULL,
    `pancardUpload` VARCHAR(255) NOT NULL,
    `accountDetailsId` INTEGER NOT NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Vendor_accountDetailsId_key`(`accountDetailsId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `companyId` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `country` VARCHAR(255) NOT NULL,
    `gstn` VARCHAR(255) NOT NULL,
    `panCardNumber` VARCHAR(255) NOT NULL,
    `contactPersonName` VARCHAR(255) NOT NULL,
    `contactPersonNumber` VARCHAR(14) NOT NULL,
    `paymentTerms` VARCHAR(500) NOT NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `projectCode` VARCHAR(255) NOT NULL,
    `projectDescription` VARCHAR(255) NOT NULL,
    `projectStartDate` DATETIME NOT NULL,
    `projectEndDate` DATETIME NOT NULL,
    `projectCustomerID` INTEGER NOT NULL,
    `customerRate` VARCHAR(255) NOT NULL,
    `rateUnit` VARCHAR(255) NOT NULL,
    `HSCode` VARCHAR(14) NOT NULL,
    `textFields` VARCHAR(500) NOT NULL,
    `timesheetApprovalLevelID` INTEGER NOT NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Project_projectCode_key`(`projectCode`),
    UNIQUE INDEX `Project_projectCustomerID_key`(`projectCustomerID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectEmployee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `projectId` INTEGER NOT NULL,
    `employeeId` INTEGER NOT NULL,
    `technologyId` INTEGER NOT NULL,
    `allocationTypeId` INTEGER NOT NULL,
    `consultantRate` VARCHAR(255) NOT NULL,
    `rateUnit` VARCHAR(255) NOT NULL,
    `timesheetTypeId` INTEGER NOT NULL,
    `sapModule` VARCHAR(255) NOT NULL,
    `employeeStartDate` DATETIME NOT NULL,
    `employeeEndDate` DATETIME NOT NULL,
    `timesheetCycleStartDay` INTEGER NOT NULL,
    `timesheetCycleEndDay` INTEGER NOT NULL,
    `modeOfPaymentId` INTEGER NOT NULL,
    `revenue` DECIMAL(10, 2) NOT NULL,
    `inactive` BOOLEAN NOT NULL DEFAULT false,
    `salaryPaymentDays` INTEGER NOT NULL,
    `tds` DECIMAL(10, 2) NOT NULL,
    `accountDetailsId` INTEGER NOT NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `ProjectEmployee_accountDetailsId_key`(`accountDetailsId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VendorAgreements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `agreementFilename` VARCHAR(255) NOT NULL,
    `vendorId` INTEGER NOT NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CustomerAgreements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `agreementFilename` VARCHAR(255) NOT NULL,
    `customerId` INTEGER NOT NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_accountDetailsId_fkey` FOREIGN KEY (`accountDetailsId`) REFERENCES `AccountDetails`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_employeeTypeId_fkey` FOREIGN KEY (`employeeTypeId`) REFERENCES `EmployeeType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_timingAvailabiltyId_fkey` FOREIGN KEY (`timingAvailabiltyId`) REFERENCES `TimingAvailabilty`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_vendorId_fkey` FOREIGN KEY (`vendorId`) REFERENCES `Vendor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_accountDetailsId_fkey` FOREIGN KEY (`accountDetailsId`) REFERENCES `AccountDetails`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_additionalAccountDetailsId_fkey` FOREIGN KEY (`additionalAccountDetailsId`) REFERENCES `AccountDetails`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vendor` ADD CONSTRAINT `Vendor_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vendor` ADD CONSTRAINT `Vendor_accountDetailsId_fkey` FOREIGN KEY (`accountDetailsId`) REFERENCES `AccountDetails`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_projectCustomerID_fkey` FOREIGN KEY (`projectCustomerID`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_timesheetApprovalLevelID_fkey` FOREIGN KEY (`timesheetApprovalLevelID`) REFERENCES `TimesheetApprovalLevel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectEmployee` ADD CONSTRAINT `ProjectEmployee_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectEmployee` ADD CONSTRAINT `ProjectEmployee_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectEmployee` ADD CONSTRAINT `ProjectEmployee_technologyId_fkey` FOREIGN KEY (`technologyId`) REFERENCES `Technology`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectEmployee` ADD CONSTRAINT `ProjectEmployee_allocationTypeId_fkey` FOREIGN KEY (`allocationTypeId`) REFERENCES `AllocationType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectEmployee` ADD CONSTRAINT `ProjectEmployee_timesheetTypeId_fkey` FOREIGN KEY (`timesheetTypeId`) REFERENCES `TimesheetType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectEmployee` ADD CONSTRAINT `ProjectEmployee_modeOfPaymentId_fkey` FOREIGN KEY (`modeOfPaymentId`) REFERENCES `ModeOfPayment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectEmployee` ADD CONSTRAINT `ProjectEmployee_accountDetailsId_fkey` FOREIGN KEY (`accountDetailsId`) REFERENCES `AccountDetails`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VendorAgreements` ADD CONSTRAINT `VendorAgreements_vendorId_fkey` FOREIGN KEY (`vendorId`) REFERENCES `Vendor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerAgreements` ADD CONSTRAINT `CustomerAgreements_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
