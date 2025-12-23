/*
  Warnings:

  - Added the required column `datetime` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provinceId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provinceId` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Booking` DROP FOREIGN KEY `Booking_guide_fkey`;

-- DropForeignKey
ALTER TABLE `Booking` DROP FOREIGN KEY `Booking_tourist_fkey`;

-- AlterTable
ALTER TABLE `Booking` ADD COLUMN `datetime` DATETIME(3) NOT NULL,
    ADD COLUMN `provinceId` INTEGER NOT NULL,
    ALTER COLUMN `status` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Trip` ADD COLUMN `provinceId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Province` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Province_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Trip` ADD CONSTRAINT `Trip_provinceId_fkey` FOREIGN KEY (`provinceId`) REFERENCES `Province`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_touristId_fkey` FOREIGN KEY (`touristId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_guideId_fkey` FOREIGN KEY (`guideId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_provinceId_fkey` FOREIGN KEY (`provinceId`) REFERENCES `Province`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
