/*
  Warnings:

  - Made the column `latitude` on table `addresses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `longitude` on table `addresses` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `addresses` MODIFY `latitude` VARCHAR(191) NOT NULL,
    MODIFY `longitude` VARCHAR(191) NOT NULL;
