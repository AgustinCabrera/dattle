/*
  Warnings:

  - A unique constraint covering the columns `[eventId]` on the table `HeatService` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `eventId` to the `HeatService` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `heatservice` ADD COLUMN `eventId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `HeatService_eventId_key` ON `HeatService`(`eventId`);

-- AddForeignKey
ALTER TABLE `HeatService` ADD CONSTRAINT `HeatService_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
