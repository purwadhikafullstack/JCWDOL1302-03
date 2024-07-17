/*
  Warnings:

  - Added the required column `description` to the `cart_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `cart_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cart_items` ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
