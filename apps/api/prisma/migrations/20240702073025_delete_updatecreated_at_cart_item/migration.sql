/*
  Warnings:

  - You are about to drop the column `createdDate` on the `cart_items` table. All the data in the column will be lost.
  - You are about to drop the column `updatedDate` on the `cart_items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cart_items` DROP COLUMN `createdDate`,
    DROP COLUMN `updatedDate`;
