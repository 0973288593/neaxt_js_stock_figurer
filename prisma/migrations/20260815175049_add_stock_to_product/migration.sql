/*
  Warnings:

  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `price_cost` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `stock` INTEGER NOT NULL DEFAULT 0,
    MODIFY `price` DOUBLE NOT NULL,
    MODIFY `price_cost` DOUBLE NOT NULL;
