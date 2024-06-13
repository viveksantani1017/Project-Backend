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
    `bankName` VARCHAR(255) NOT NULL,
    `accountName` VARCHAR(255) NOT NULL,
    `bankAccountNumber` VARCHAR(255) NOT NULL,
    `ifscCode` VARCHAR(255) NOT NULL,
    `micr` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employeeType` VARCHAR(255) NOT NULL,
    `companyCode` VARCHAR(255) NOT NULL,
    `resumeMasterNumber` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `alternativeName` VARCHAR(255) NOT NULL,
    `age` INTEGER NOT NULL,
    `skillSet` VARCHAR(255) NOT NULL,
    `experience` INTEGER NOT NULL,
    `timing` VARCHAR(255) NOT NULL,
    `contactNumber1` VARCHAR(14) NOT NULL,
    `contactNumber2` VARCHAR(14) NOT NULL,
    `remarks` VARCHAR(255) NOT NULL,
    `referredBy` VARCHAR(255) NOT NULL,
    `createdBy` VARCHAR(255) NOT NULL,
    `ndaUpload` VARCHAR(255) NOT NULL,
    `vendorProfiles` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vendor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vendorCode` VARCHAR(255) NOT NULL,
    `vendorName` VARCHAR(255) NOT NULL,
    `vendorAddress` VARCHAR(255) NOT NULL,
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
CREATE TABLE `Customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customerCode` VARCHAR(255) NOT NULL,
    `customerName` VARCHAR(255) NOT NULL,
    `customerAddress` VARCHAR(255) NOT NULL,
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
