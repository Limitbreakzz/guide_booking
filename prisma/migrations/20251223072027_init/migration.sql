/*
  Warnings:

  - You are about to alter the column `status` on the `Booking` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - You are about to alter the column `role` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - A unique constraint covering the columns `[name]` on the table `Province` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tripId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guideId` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Booking` ADD COLUMN `tripId` INTEGER NOT NULL,
    MODIFY `status` ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED') NOT NULL;

-- AlterTable
ALTER TABLE `Trip` ADD COLUMN `guideId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('USER', 'GUIDE', 'ADMIN') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Province_name_key` ON `Province`(`name`);

-- AddForeignKey
ALTER TABLE `Trip` ADD CONSTRAINT `Trip_guideId_fkey` FOREIGN KEY (`guideId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_tripId_fkey` FOREIGN KEY (`tripId`) REFERENCES `Trip`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
