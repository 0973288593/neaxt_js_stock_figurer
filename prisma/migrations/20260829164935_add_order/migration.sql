/*
  Warnings:

  - You are about to drop the column `lineAccounrName` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `tikTokAccountName` on the `Customer` table. All the data in the column will be lost.
  - Added the required column `order_id` to the `PaymentPlan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `PaymentPlan` DROP FOREIGN KEY `PaymentPlan_product_id_fkey`;

-- DropIndex
DROP INDEX `PaymentPlan_product_id_idx` ON `PaymentPlan`;

-- AlterTable
ALTER TABLE `Customer` DROP COLUMN `lineAccounrName`,
    DROP COLUMN `tikTokAccountName`,
    ADD COLUMN `lineAccount` VARCHAR(191) NULL,
    ADD COLUMN `phoneNumber` VARCHAR(191) NULL,
    ADD COLUMN `tiktokAccount` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `PaymentPlan` ADD COLUMN `order_id` VARCHAR(191) NOT NULL,
    MODIFY `product_id` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Order` (
    `id` VARCHAR(191) NOT NULL,
    `orderNumber` VARCHAR(191) NOT NULL,
    `customer_id` INTEGER NOT NULL,
    `status` ENUM('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'COMPLETED') NOT NULL DEFAULT 'PENDING',
    `paymentStatus` ENUM('PENDING', 'PAID', 'FAILED', 'REFUNDED') NOT NULL DEFAULT 'PENDING',
    `subtotal` DECIMAL(12, 2) NOT NULL,
    `discount` DECIMAL(12, 2) NOT NULL DEFAULT 0,
    `shippingCost` DECIMAL(12, 2) NOT NULL DEFAULT 0,
    `tax` DECIMAL(12, 2) NOT NULL DEFAULT 0,
    `total` DECIMAL(12, 2) NOT NULL,
    `customerName` VARCHAR(191) NOT NULL,
    `customerEmail` VARCHAR(191) NULL,
    `customerPhone` VARCHAR(191) NULL,
    `shippingAddress` VARCHAR(191) NULL,
    `shippingCity` VARCHAR(191) NULL,
    `shippingState` VARCHAR(191) NULL,
    `shippingZip` VARCHAR(191) NULL,
    `shippingCountry` VARCHAR(191) NULL,
    `note` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Order_orderNumber_key`(`orderNumber`),
    INDEX `Order_customer_id_idx`(`customer_id`),
    INDEX `Order_status_idx`(`status`),
    INDEX `Order_paymentStatus_idx`(`paymentStatus`),
    INDEX `Order_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderItem` (
    `id` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NULL,
    `productName` VARCHAR(191) NOT NULL,
    `productSku` VARCHAR(191) NULL,
    `quantity` INTEGER NOT NULL,
    `unitPrice` DECIMAL(12, 2) NOT NULL,
    `totalPrice` DECIMAL(12, 2) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `OrderItem_orderId_idx`(`orderId`),
    INDEX `OrderItem_productId_idx`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `PaymentPlan_order_id_idx` ON `PaymentPlan`(`order_id`);

-- AddForeignKey
ALTER TABLE `PaymentPlan` ADD CONSTRAINT `PaymentPlan_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymentPlan` ADD CONSTRAINT `PaymentPlan_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
