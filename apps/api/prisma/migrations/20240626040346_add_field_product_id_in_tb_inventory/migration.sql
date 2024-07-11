/*
  Warnings:

  - Added the required column `product_id` to the `inventories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `inventories` ADD COLUMN `product_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `inventories` ADD CONSTRAINT `inventories_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
