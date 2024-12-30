/*
  Warnings:

  - You are about to drop the column `detectionDate` on the `heatservice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `heatservice` DROP COLUMN `detectionDate`,
    MODIFY `serviceDate` DATETIME(3) NULL;
