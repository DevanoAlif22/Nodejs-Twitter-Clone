-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 17 Jun 2024 pada 15.41
-- Versi server: 10.4.24-MariaDB
-- Versi PHP: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodejs_belajar_twitter`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `diikuti`
--

CREATE TABLE `diikuti` (
  `id` int(11) NOT NULL,
  `diikuti` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pengguna_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `diikuti`
--

INSERT INTO `diikuti` (`id`, `diikuti`, `pengguna_id`) VALUES
(28, 'devanoalif_', 2),
(30, 'devabro_', 1),
(31, 'feryrahman', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `mengikuti`
--

CREATE TABLE `mengikuti` (
  `id` int(11) NOT NULL,
  `mengikuti` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pengguna_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `mengikuti`
--

INSERT INTO `mengikuti` (`id`, `mengikuti`, `pengguna_id`) VALUES
(37, 'feryrahman', 1),
(39, 'devanoalif_', 6),
(40, 'devanoalif_', 2);

-- --------------------------------------------------------

--
-- Struktur dari tabel `pengguna`
--

CREATE TABLE `pengguna` (
  `id` int(11) NOT NULL,
  `username` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bio` mediumtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `situs` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lahir` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bergabung` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gambarlatar` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gambarprofil` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `pengguna`
--

INSERT INTO `pengguna` (`id`, `username`, `name`, `password`, `bio`, `situs`, `lahir`, `bergabung`, `gambarlatar`, `gambarprofil`) VALUES
(1, 'devanoalif_', 'devanoalif_', '$2b$10$P1ZscogKYsmnwX6EpYBeU.5hLrtRUGYBj0ph5p7aE4qdsqslYWVFe', 'Areknya bukan yang lain', 'devanoalif22.github.io', '2003-11-22', 'Agustus 2023', '1692343231721.jpeg', '1692006192222.jpeg'),
(2, 'feryrahman', 'feryrahman', '$2b$10$TGvWSBmCAWZRRyvCUwypEecGBsNJ7CPPUMIm44xbkqj65t16x0amW', NULL, NULL, '2003-01-16', 'Agustus 2023', NULL, NULL),
(3, 'ferygolang', 'ferygolang', '$2b$10$6G47FcuZy2/cm4u1NHmY..XbKr19KdQ3O0xvVsKdn9otlgn6oVozS', NULL, NULL, '2023-08-04', 'Agustus 2023', NULL, NULL),
(4, 'ferybaik', 'ferybaik', '$2b$10$NOY3hzCPJtF.zr2VZMHWmOh3QZA.M.5pIpueT.0ZQ6AedfR29Iebi', NULL, NULL, '2004-01-09', 'Agustus 2023', NULL, NULL),
(5, 'ferygerigi5', 'ferygerigi5', '$2b$10$UBeBYal1PttMwxrN1LjKF.jkZdT8ylWSMu8pSSJzvV8Tft.X4xBxC', NULL, NULL, '2023-08-02', 'Agustus 2023', NULL, NULL),
(6, 'devabro_', 'devabro_', '$2b$10$j8eH.eEUtIaQOLb6cDof/OzMcoFXaaByA7PmT56Y6JF1CnB1Gtqhi', NULL, NULL, '2003-11-22', 'Agustus 2023', '1692674349532.jpeg', '1692674365044.jpg');

-- --------------------------------------------------------

--
-- Struktur dari tabel `postingan`
--

CREATE TABLE `postingan` (
  `id` int(11) NOT NULL,
  `deskripsi` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `gambar` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pengguna_id` int(11) NOT NULL,
  `tanggal` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `postingan`
--

INSERT INTO `postingan` (`id`, `deskripsi`, `gambar`, `pengguna_id`, `tanggal`) VALUES
(1, 'Makan dulu bro', '1692348863775.jpeg', 1, '18 Agustus 2023'),
(3, 'kematian toji\r\n', '1692674422296.png', 6, '22 Agustus 2023');

-- --------------------------------------------------------

--
-- Struktur dari tabel `suka`
--

CREATE TABLE `suka` (
  `pengguna_id` int(11) NOT NULL,
  `postingan_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `suka`
--

INSERT INTO `suka` (`pengguna_id`, `postingan_id`) VALUES
(2, 1),
(6, 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('02a245c1-ad85-496f-bc4f-9273ea5ad3ad', '1e16dc9c1fcc0eb077cc6412d2507ca224aabfa81ac5477985e3c4142ba63557', '2023-08-14 09:40:49.160', '20230814080431_create_table_mengikuti', NULL, NULL, '2023-08-14 09:40:48.878', 1),
('0f310aaa-76e3-4463-b0b2-cc962b3b39c5', '5961e7a417e0c0ee9791af75bc803b9ae61065ca23e46944aa7da387ad96de3b', '2023-08-14 09:40:49.631', '20230814084233_create_table_mengikuti', NULL, NULL, '2023-08-14 09:40:49.163', 1),
('1a952735-8b4f-4879-95f4-5a555744540b', '6984601344b4affb5f9248b04f8bfd5e332045f898f3d2d00fa346946946d94a', '2023-08-14 09:40:48.596', '20230811115649_add_image_table_pengguna', NULL, NULL, '2023-08-14 09:40:48.510', 1),
('2823d090-2e45-4a22-933b-1f18a3db1ac3', '61324ce5a667c7649ec32a57510fa7ba1ed9ed082b07a231983b00a2a3e12144', '2023-08-18 08:51:36.363', '20230818085056_create_table_suka', NULL, NULL, '2023-08-18 08:51:36.039', 1),
('b571624b-2eaf-4eb2-86a7-74b838b40707', '4874bb22a290b6f47c6f1de447eab98741776c25595e634f2deb638708a8862c', '2023-08-14 09:40:48.506', '20230811070406_create_table_pengguna', NULL, NULL, '2023-08-14 09:40:48.407', 1),
('bf2ad071-d3e2-47a8-8f57-6a3f2e136dfa', '9a29356bd7cf5db9b71e06f9e420092ad2467393c1f11e7bb402ebaf8601f95f', '2023-08-14 09:40:48.875', '20230813082752_add_tanggal_table_postingan', NULL, NULL, '2023-08-14 09:40:48.811', 1),
('ca362515-6757-483b-923f-18ef82c2e43f', '580e559d91a76be92c5a5d4d61e7580a21422dc36a92d22b22ab3d51b18e2e30', '2023-08-15 06:55:09.393', '20230815065443_edit_table_mengikuti_diikuti', NULL, NULL, '2023-08-15 06:55:09.269', 1),
('e944bc75-37c9-45be-980f-589a5518d35f', '01ec112f243dd6768656174be9358a4f0735590b38d26b4af6f12d482302e992', '2023-08-14 09:40:48.807', '20230812111009_create_table_postingan', NULL, NULL, '2023-08-14 09:40:48.600', 1);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `diikuti`
--
ALTER TABLE `diikuti`
  ADD PRIMARY KEY (`id`),
  ADD KEY `diikuti_pengguna_id_fkey` (`pengguna_id`);

--
-- Indeks untuk tabel `mengikuti`
--
ALTER TABLE `mengikuti`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mengikuti_pengguna_id_fkey` (`pengguna_id`);

--
-- Indeks untuk tabel `pengguna`
--
ALTER TABLE `pengguna`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pengguna_username_key` (`username`),
  ADD UNIQUE KEY `pengguna_name_key` (`name`);

--
-- Indeks untuk tabel `postingan`
--
ALTER TABLE `postingan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `postingan_pengguna_id_fkey` (`pengguna_id`);

--
-- Indeks untuk tabel `suka`
--
ALTER TABLE `suka`
  ADD PRIMARY KEY (`pengguna_id`,`postingan_id`),
  ADD KEY `suka_postingan_id_fkey` (`postingan_id`);

--
-- Indeks untuk tabel `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `diikuti`
--
ALTER TABLE `diikuti`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT untuk tabel `mengikuti`
--
ALTER TABLE `mengikuti`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT untuk tabel `pengguna`
--
ALTER TABLE `pengguna`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `postingan`
--
ALTER TABLE `postingan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `diikuti`
--
ALTER TABLE `diikuti`
  ADD CONSTRAINT `diikuti_pengguna_id_fkey` FOREIGN KEY (`pengguna_id`) REFERENCES `pengguna` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `mengikuti`
--
ALTER TABLE `mengikuti`
  ADD CONSTRAINT `mengikuti_pengguna_id_fkey` FOREIGN KEY (`pengguna_id`) REFERENCES `pengguna` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `postingan`
--
ALTER TABLE `postingan`
  ADD CONSTRAINT `postingan_pengguna_id_fkey` FOREIGN KEY (`pengguna_id`) REFERENCES `pengguna` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `suka`
--
ALTER TABLE `suka`
  ADD CONSTRAINT `suka_pengguna_id_fkey` FOREIGN KEY (`pengguna_id`) REFERENCES `pengguna` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `suka_postingan_id_fkey` FOREIGN KEY (`postingan_id`) REFERENCES `postingan` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
