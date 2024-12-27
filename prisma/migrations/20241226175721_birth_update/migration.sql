/*
  Warnings:

  - You are about to drop the column `notes` on the `births` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfOffspring` on the `births` table. All the data in the column will be lost.
  - You are about to drop the column `offspringSex` on the `births` table. All the data in the column will be lost.
  - You are about to drop the column `offspringState` on the `births` table. All the data in the column will be lost.
  - Added the required column `animalTag` to the `Births` table without a default value. This is not possible if the table is not empty.
  - Added the required column `observation` to the `Births` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pups` to the `Births` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `births` DROP COLUMN `notes`,
    DROP COLUMN `numberOfOffspring`,
    DROP COLUMN `offspringSex`,
    DROP COLUMN `offspringState`,
    ADD COLUMN `animalTag` VARCHAR(191) NOT NULL,
    ADD COLUMN `observation` VARCHAR(191) NOT NULL,
    ADD COLUMN `pups` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Births` ADD CONSTRAINT `Births_animalTag_fkey` FOREIGN KEY (`animalTag`) REFERENCES `Animal`(`tag`) ON DELETE RESTRICT ON UPDATE CASCADE;
