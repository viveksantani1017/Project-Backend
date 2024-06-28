/*
  Warnings:

  - You are about to alter the column `projectStartDate` on the `project` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `projectEndDate` on the `project` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `employeeStartDate` on the `projectemployee` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `employeeEndDate` on the `projectemployee` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `project` MODIFY `projectStartDate` DATETIME NOT NULL,
    MODIFY `projectEndDate` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `projectemployee` MODIFY `employeeStartDate` DATETIME NOT NULL,
    MODIFY `employeeEndDate` DATETIME NOT NULL;
