/*
  Warnings:

  - You are about to drop the column `diagnosis` on the `diseases` table. All the data in the column will be lost.
  - You are about to drop the column `diagnosisDate` on the `diseases` table. All the data in the column will be lost.
  - You are about to drop the column `treatmentDetails` on the `diseases` table. All the data in the column will be lost.
  - You are about to drop the column `treatmentEndDate` on the `diseases` table. All the data in the column will be lost.
  - You are about to drop the column `treatmentStartDate` on the `diseases` table. All the data in the column will be lost.
  - You are about to drop the column `veterinarianId` on the `diseases` table. All the data in the column will be lost.
  - Added the required column `diseaseType` to the `Diseases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `observation` to the `Diseases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Diseases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `diseases` DROP COLUMN `diagnosis`,
    DROP COLUMN `diagnosisDate`,
    DROP COLUMN `treatmentDetails`,
    DROP COLUMN `treatmentEndDate`,
    DROP COLUMN `treatmentStartDate`,
    DROP COLUMN `veterinarianId`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `diseaseType` VARCHAR(191) NOT NULL,
    ADD COLUMN `observation` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
