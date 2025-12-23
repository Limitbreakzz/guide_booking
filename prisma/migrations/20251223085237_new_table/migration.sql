/*
  Warnings:

  - You are about to drop the column `datetime` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `provinceId` on the `Booking` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `Booking` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(1))`.
  - You are about to drop the column `provinceId` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the `Province` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tourist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Booking` DROP FOREIGN KEY `Booking_guideId_fkey`;

-- DropForeignKey
ALTER TABLE `Booking` DROP FOREIGN KEY `Booking_provinceId_fkey`;

-- DropForeignKey
ALTER TABLE `Booking` DROP FOREIGN KEY `Booking_touristId_fkey`;

-- DropForeignKey
ALTER TABLE `Trip` DROP FOREIGN KEY `Trip_guideId_fkey`;

-- DropForeignKey
ALTER TABLE `Trip` DROP FOREIGN KEY `Trip_provinceId_fkey`;

-- AlterTable
ALTER TABLE `Booking` DROP COLUMN `datetime`,
    DROP COLUMN `provinceId`,
    MODIFY `status` ENUM('PENDING', 'CONFIRMED') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `Trip` DROP COLUMN `provinceId`;

-- DropTable
DROP TABLE `Province`;

-- DropTable
DROP TABLE `Tourist`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('TOURIST', 'GUIDE') NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Trip` ADD CONSTRAINT `Trip_guideId_fkey` FOREIGN KEY (`guideId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_tourist_fkey` FOREIGN KEY (`touristId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_guide_fkey` FOREIGN KEY (`guideId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
