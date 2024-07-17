/*
  Warnings:

  - You are about to drop the column `location` on the `stores` table. All the data in the column will be lost.
  - Added the required column `province` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subdistrict` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `stores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `stores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `stores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `stores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `addresses` ADD COLUMN `province` VARCHAR(191) NOT NULL,
    ADD COLUMN `subdistrict` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `stores` DROP COLUMN `location`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `postalCode` VARCHAR(191) NOT NULL,
    ADD COLUMN `province` VARCHAR(191) NOT NULL;
