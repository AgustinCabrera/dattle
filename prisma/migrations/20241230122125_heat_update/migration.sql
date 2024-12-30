/*
  Warnings:

  - Added the required column `detectionDate` to the `HeatService` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `heatservice` ADD COLUMN `detectionDate` DATETIME(3) NOT NULL;
