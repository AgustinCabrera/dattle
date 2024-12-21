/*
  Warnings:

  - You are about to drop the `diseases` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `births` DROP FOREIGN KEY `Births_eventId_fkey`;

-- DropForeignKey
ALTER TABLE `diseases` DROP FOREIGN KEY `Diseases_eventId_fkey`;

-- DropForeignKey
ALTER TABLE `heatservice` DROP FOREIGN KEY `HeatService_eventId_fkey`;

-- DropIndex
DROP INDEX `Births_eventId_fkey` ON `births`;

-- DropIndex
DROP INDEX `HeatService_eventId_fkey` ON `heatservice`;

-- AlterTable
ALTER TABLE `births` MODIFY `eventId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `heatservice` MODIFY `eventId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `diseases`;

-- CreateTable
CREATE TABLE `Disease` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `observation` VARCHAR(191) NULL,
    `eventId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `HeatService` ADD CONSTRAINT `HeatService_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Disease` ADD CONSTRAINT `Disease_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Births` ADD CONSTRAINT `Births_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
