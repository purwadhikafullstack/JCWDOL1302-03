/*
  Warnings:

  - You are about to drop the column `role_id` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `role_id`,
    ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'user';
