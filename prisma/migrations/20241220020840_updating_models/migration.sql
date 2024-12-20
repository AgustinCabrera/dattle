/*
  Warnings:

  - You are about to drop the column `species` on the `animal` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[password]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `animal` DROP COLUMN `species`;

-- CreateTable
CREATE TABLE `HeatService` (
    `id` VARCHAR(191) NOT NULL,
    `eventId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `detectionDate` DATETIME(3) NOT NULL,
    `serviceDate` DATETIME(3) NOT NULL,
    `observation` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Diseases` (
    `id` VARCHAR(191) NOT NULL,
    `eventId` VARCHAR(191) NOT NULL,
    `diagnosis` VARCHAR(191) NOT NULL,
    `diagnosisDate` DATETIME(3) NOT NULL,
    `treatmentDetails` VARCHAR(191) NOT NULL,
    `treatmentStartDate` DATETIME(3) NOT NULL,
    `treatmentEndDate` DATETIME(3) NOT NULL,
    `veterinarianId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Births` (
    `id` VARCHAR(191) NOT NULL,
    `eventId` VARCHAR(191) NOT NULL,
    `birthDate` DATETIME(3) NOT NULL,
    `numberOfOffspring` INTEGER NOT NULL,
    `offspringSex` JSON NOT NULL,
    `offspringState` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_password_key` ON `User`(`password`);

-- AddForeignKey
ALTER TABLE `HeatService` ADD CONSTRAINT `HeatService_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Diseases` ADD CONSTRAINT `Diseases_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Births` ADD CONSTRAINT `Births_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
