/*
  Warnings:

  - Added the required column `animalTag` to the `HeatService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `heatTime` to the `HeatService` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `heatservice` ADD COLUMN `animalTag` VARCHAR(191) NOT NULL,
    ADD COLUMN `heatTime` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `HeatService` ADD CONSTRAINT `HeatService_animalTag_fkey` FOREIGN KEY (`animalTag`) REFERENCES `Animal`(`tag`) ON DELETE RESTRICT ON UPDATE CASCADE;
