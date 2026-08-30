/*
  Warnings:

  - Added the required column `lineAccounrName` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tikTokAccountName` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Customer` ADD COLUMN `lineAccounrName` VARCHAR(191) NOT NULL,
    ADD COLUMN `tikTokAccountName` VARCHAR(191) NOT NULL;
