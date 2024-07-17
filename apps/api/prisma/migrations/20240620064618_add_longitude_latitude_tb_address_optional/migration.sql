/*
  Warnings:

  - Made the column `latitude` on table `stores` required. This step will fail if there are existing NULL values in that column.
  - Made the column `longitude` on table `stores` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `addresses` MODIFY `latitude` VARCHAR(191) NULL,
    MODIFY `longitude` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `stores` MODIFY `latitude` VARCHAR(191) NOT NULL,
    MODIFY `longitude` VARCHAR(191) NOT NULL;
