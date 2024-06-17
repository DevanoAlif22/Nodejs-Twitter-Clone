-- CreateTable
CREATE TABLE `postingan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `deskripsi` TEXT NOT NULL,
    `gambar` VARCHAR(100) NULL,
    `pengguna_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- AddForeignKey
ALTER TABLE `postingan` ADD CONSTRAINT `postingan_pengguna_id_fkey` FOREIGN KEY (`pengguna_id`) REFERENCES `pengguna`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
