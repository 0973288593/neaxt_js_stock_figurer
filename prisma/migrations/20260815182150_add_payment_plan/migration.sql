-- CreateTable
CREATE TABLE `Customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PaymentPlan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `total_amount` DECIMAL(12, 2) NOT NULL,
    `deposit_amount` DECIMAL(12, 2) NOT NULL,
    `remaining_amount` DECIMAL(12, 2) NOT NULL,
    `installment_count` INTEGER NOT NULL,
    `installment_amount` DECIMAL(12, 2) NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `status` ENUM('ACTIVE', 'COMPLETED', 'CANCELLED', 'OVERDUE') NOT NULL DEFAULT 'ACTIVE',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `PaymentPlan_customer_id_idx`(`customer_id`),
    INDEX `PaymentPlan_product_id_idx`(`product_id`),
    INDEX `PaymentPlan_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `payment_plan_id` INTEGER NOT NULL,
    `amount` DECIMAL(12, 2) NOT NULL,
    `payment_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `payment_method` ENUM('CASH', 'TRANSFER', 'QR', 'CARD', 'OTHER') NOT NULL,
    `note` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Payment_payment_plan_id_idx`(`payment_plan_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PaymentPlan` ADD CONSTRAINT `PaymentPlan_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymentPlan` ADD CONSTRAINT `PaymentPlan_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_payment_plan_id_fkey` FOREIGN KEY (`payment_plan_id`) REFERENCES `PaymentPlan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
