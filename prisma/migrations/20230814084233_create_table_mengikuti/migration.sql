-- CreateTable
CREATE TABLE `diikuti` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `diikuti` VARCHAR(100) NOT NULL,
    `pengguna_id` INTEGER NOT NULL,

    UNIQUE INDEX `diikuti_diikuti_key`(`diikuti`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- AddForeignKey
ALTER TABLE `diikuti` ADD CONSTRAINT `diikuti_pengguna_id_fkey` FOREIGN KEY (`pengguna_id`) REFERENCES `pengguna`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
