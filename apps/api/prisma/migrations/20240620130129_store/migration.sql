/*
  Warnings:

  - Made the column `postalCode` on table `stores` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `stores` MODIFY `postalCode` INTEGER NOT NULL;
