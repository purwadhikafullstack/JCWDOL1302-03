/*
  Warnings:

  - You are about to drop the column `totalAmount` on the `cart_items` table. All the data in the column will be lost.
  - Added the required column `price` to the `cart_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `carts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cart_items` DROP COLUMN `totalAmount`,
    ADD COLUMN `price` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `carts` ADD COLUMN `store_id` INTEGER NULL,
    ADD COLUMN `totalAmount` DOUBLE NOT NULL;

-- AddForeignKey
ALTER TABLE `carts` ADD CONSTRAINT `carts_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `stores`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
