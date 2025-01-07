/*
  Warnings:

  - A unique constraint covering the columns `[eventId]` on the table `Births` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[eventId]` on the table `Disease` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `eventId` to the `Births` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `births` ADD COLUMN `eventId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Births_eventId_key` ON `Births`(`eventId`);

-- CreateIndex
CREATE UNIQUE INDEX `Disease_eventId_key` ON `Disease`(`eventId`);

-- AddForeignKey
ALTER TABLE `Disease` ADD CONSTRAINT `Disease_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Births` ADD CONSTRAINT `Births_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
