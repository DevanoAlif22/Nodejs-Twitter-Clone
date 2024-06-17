-- CreateTable
CREATE TABLE `mengikuti` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mengikuti` VARCHAR(100) NOT NULL,
    `pengguna_id` INTEGER NOT NULL,

    UNIQUE INDEX `mengikuti_mengikuti_key`(`mengikuti`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- AddForeignKey
ALTER TABLE `mengikuti` ADD CONSTRAINT `mengikuti_pengguna_id_fkey` FOREIGN KEY (`pengguna_id`) REFERENCES `pengguna`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
