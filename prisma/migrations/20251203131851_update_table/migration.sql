/*
  Warnings:

  - You are about to drop the column `tel` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `tel`,
    ADD COLUMN `experience` VARCHAR(191) NULL,
    ADD COLUMN `language` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `Room`;

-- CreateTable
CREATE TABLE `Province` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Trip` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `provinceId` INTEGER NOT NULL,
    `price` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Booking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `datetime` DATETIME(3) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `touristId` INTEGER NOT NULL,
    `guideId` INTEGER NOT NULL,
    `provinceId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
