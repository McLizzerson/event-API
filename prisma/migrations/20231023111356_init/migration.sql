/*
  Warnings:

  - You are about to drop the column `createdBy` on the `Event` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Event_createdBy_idx` ON `Event`;

-- AlterTable
ALTER TABLE `Event` DROP COLUMN `createdBy`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `Event_userId_idx` ON `Event`(`userId`);
