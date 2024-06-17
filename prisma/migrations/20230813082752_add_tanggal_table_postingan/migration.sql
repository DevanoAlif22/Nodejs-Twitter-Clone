/*
  Warnings:

  - Added the required column `tanggal` to the `postingan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `postingan` ADD COLUMN `tanggal` VARCHAR(100) NOT NULL;
