/*
  Warnings:

  - Added the required column `pups` to the `Births` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `births` ADD COLUMN `pups` INTEGER NOT NULL;
