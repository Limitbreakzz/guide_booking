/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Booking` DROP FOREIGN KEY `Booking_guideId_fkey`;

-- DropForeignKey
ALTER TABLE `Booking` DROP FOREIGN KEY `Booking_touristId_fkey`;

-- DropForeignKey
ALTER TABLE `Trip` DROP FOREIGN KEY `Trip_guideId_fkey`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `Tourist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `tel` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('TOURIST', 'GUIDE', 'ADMIN') NOT NULL,
    `image` VARCHAR(191) NULL,
    `province` VARCHAR(191) NULL,
    `experience` VARCHAR(191) NULL,
    `language` VARCHAR(191) NULL,

    UNIQUE INDEX `Tourist_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Trip` ADD CONSTRAINT `Trip_guideId_fkey` FOREIGN KEY (`guideId`) REFERENCES `Tourist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_touristId_fkey` FOREIGN KEY (`touristId`) REFERENCES `Tourist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_guideId_fkey` FOREIGN KEY (`guideId`) REFERENCES `Tourist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
