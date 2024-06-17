-- CreateTable
CREATE TABLE `suka` (
    `pengguna_id` INTEGER NOT NULL,
    `postingan_id` INTEGER NOT NULL,

    PRIMARY KEY (`pengguna_id`, `postingan_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- AddForeignKey
ALTER TABLE `suka` ADD CONSTRAINT `suka_pengguna_id_fkey` FOREIGN KEY (`pengguna_id`) REFERENCES `pengguna`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `suka` ADD CONSTRAINT `suka_postingan_id_fkey` FOREIGN KEY (`postingan_id`) REFERENCES `postingan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
