/*
  Warnings:

  - You are about to drop the column `subdistrict` on the `addresses` table. All the data in the column will be lost.
  - You are about to alter the column `city` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `province` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `address` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `addresses` DROP COLUMN `subdistrict`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL,
    MODIFY `city` INTEGER NOT NULL,
    MODIFY `province` INTEGER NOT NULL;
