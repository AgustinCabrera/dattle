/*
  Warnings:

  - You are about to drop the column `animalId` on the `event` table. All the data in the column will be lost.
  - Added the required column `animalTag` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `event` DROP FOREIGN KEY `Event_animalId_fkey`;

-- DropIndex
DROP INDEX `Event_animalId_fkey` ON `event`;

-- AlterTable
ALTER TABLE `event` DROP COLUMN `animalId`,
    ADD COLUMN `animalTag` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_animalTag_fkey` FOREIGN KEY (`animalTag`) REFERENCES `Animal`(`tag`) ON DELETE CASCADE ON UPDATE CASCADE;
