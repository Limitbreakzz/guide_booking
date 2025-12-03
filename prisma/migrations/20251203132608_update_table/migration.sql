-- AlterTable
ALTER TABLE `User` ADD COLUMN `tel` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Trip` ADD CONSTRAINT `Trip_provinceId_fkey` FOREIGN KEY (`provinceId`) REFERENCES `Province`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_touristId_fkey` FOREIGN KEY (`touristId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_guideId_fkey` FOREIGN KEY (`guideId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_provinceId_fkey` FOREIGN KEY (`provinceId`) REFERENCES `Province`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
