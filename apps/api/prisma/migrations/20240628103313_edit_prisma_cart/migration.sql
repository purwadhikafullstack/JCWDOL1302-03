/*
  Warnings:

  - Added the required column `product_id` to the `cart_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `cart_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedDate` to the `cart_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedDate` to the `carts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cart_items` ADD COLUMN `createdDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `product_id` INTEGER NOT NULL,
    ADD COLUMN `totalAmount` DOUBLE NOT NULL,
    ADD COLUMN `updatedDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `carts` ADD COLUMN `createdDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `stores` ALTER COLUMN `updatedDate` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `cart_items` ADD CONSTRAINT `cart_items_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
