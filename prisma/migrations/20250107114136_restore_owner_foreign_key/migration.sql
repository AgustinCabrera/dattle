/*
  Warnings:

  - You are about to drop the column `animalTag` on the `births` table. All the data in the column will be lost.
  - You are about to drop the column `birthDate` on the `births` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `births` table. All the data in the column will be lost.
  - You are about to drop the column `observation` on the `births` table. All the data in the column will be lost.
  - You are about to drop the column `pups` on the `births` table. All the data in the column will be lost.
  - You are about to drop the column `animalTag` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `animalTag` on the `heatservice` table. All the data in the column will be lost.
  - You are about to drop the column `animalTouch` on the `heatservice` table. All the data in the column will be lost.
  - You are about to drop the column `detectionDate` on the `heatservice` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `heatservice` table. All the data in the column will be lost.
  - You are about to drop the column `observation` on the `heatservice` table. All the data in the column will be lost.
  - You are about to drop the column `serviceDate` on the `heatservice` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tag,ownerId]` on the table `Animal` will be added. If there are existing duplicate values, this will fail.
  - Made the column `ownerId` on table `animal` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `animalId` to the `Births` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Births` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Births` table without a default value. This is not possible if the table is not empty.
  - Added the required column `animalId` to the `Disease` table without a default value. This is not possible if the table is not empty.
  - Added the required column `animalId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `event` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `animalId` to the `HeatService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `HeatService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `HeatService` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `animal` DROP FOREIGN KEY `Animal_ownerId_fkey`;

-- DropForeignKey
ALTER TABLE `births` DROP FOREIGN KEY `Births_animalTag_fkey`;

-- DropForeignKey
ALTER TABLE `births` DROP FOREIGN KEY `Births_eventId_fkey`;

-- DropForeignKey
ALTER TABLE `disease` DROP FOREIGN KEY `Disease_eventId_fkey`;

-- DropForeignKey
ALTER TABLE `event` DROP FOREIGN KEY `Event_animalTag_fkey`;

-- DropForeignKey
ALTER TABLE `heatservice` DROP FOREIGN KEY `HeatService_animalTag_fkey`;

-- DropForeignKey
ALTER TABLE `heatservice` DROP FOREIGN KEY `HeatService_eventId_fkey`;

-- DropIndex
DROP INDEX `Animal_ownerId_fkey` ON `animal`;

-- DropIndex
DROP INDEX `Animal_tag_key` ON `animal`;

-- DropIndex
DROP INDEX `Births_animalTag_fkey` ON `births`;

-- DropIndex
DROP INDEX `Births_eventId_fkey` ON `births`;

-- DropIndex
DROP INDEX `Disease_eventId_fkey` ON `disease`;

-- DropIndex
DROP INDEX `Event_animalTag_fkey` ON `event`;

-- DropIndex
DROP INDEX `HeatService_animalTag_fkey` ON `heatservice`;

-- DropIndex
DROP INDEX `HeatService_eventId_fkey` ON `heatservice`;

-- DropIndex
DROP INDEX `User_password_key` ON `user`;

-- AlterTable
ALTER TABLE `animal` MODIFY `ownerId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `births` DROP COLUMN `animalTag`,
    DROP COLUMN `birthDate`,
    DROP COLUMN `eventId`,
    DROP COLUMN `observation`,
    DROP COLUMN `pups`,
    ADD COLUMN `animalId` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `date` DATETIME(3) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `disease` ADD COLUMN `animalId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `event` DROP COLUMN `animalTag`,
    ADD COLUMN `animalId` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `heatservice` DROP COLUMN `animalTag`,
    DROP COLUMN `animalTouch`,
    DROP COLUMN `detectionDate`,
    DROP COLUMN `eventId`,
    DROP COLUMN `observation`,
    DROP COLUMN `serviceDate`,
    ADD COLUMN `animalId` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `date` DATETIME(3) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Animal_tag_ownerId_key` ON `Animal`(`tag`, `ownerId`);

-- AddForeignKey
ALTER TABLE `Animal` ADD CONSTRAINT `Animal_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_animalId_fkey` FOREIGN KEY (`animalId`) REFERENCES `Animal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HeatService` ADD CONSTRAINT `HeatService_animalId_fkey` FOREIGN KEY (`animalId`) REFERENCES `Animal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Disease` ADD CONSTRAINT `Disease_animalId_fkey` FOREIGN KEY (`animalId`) REFERENCES `Animal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Births` ADD CONSTRAINT `Births_animalId_fkey` FOREIGN KEY (`animalId`) REFERENCES `Animal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
