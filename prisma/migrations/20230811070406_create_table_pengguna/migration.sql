-- CreateTable
CREATE TABLE `pengguna` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NULL,
    `password` VARCHAR(100) NOT NULL,
    `bio` MEDIUMTEXT NULL,
    `situs` VARCHAR(100) NULL,
    `lahir` VARCHAR(100) NULL,
    `bergabung` VARCHAR(100) NULL,

    UNIQUE INDEX `pengguna_username_key`(`username`),
    UNIQUE INDEX `pengguna_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;
