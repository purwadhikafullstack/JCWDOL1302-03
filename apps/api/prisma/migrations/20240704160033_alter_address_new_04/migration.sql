/*
  Warnings:

  - You are about to drop the column `address` on the `addresses` table. All the data in the column will be lost.
  - Added the required column `subdistrict` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `addresses` DROP COLUMN `address`,
    ADD COLUMN `subdistrict` VARCHAR(191) NOT NULL;
