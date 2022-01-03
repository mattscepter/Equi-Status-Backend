SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE equiBackend;

USE equiBackend;

CREATE TABLE `credential` (
  `id` varchar(5) COLLATE utf32_unicode_ci NOT NULL,
  `name` varchar(245) COLLATE utf32_unicode_ci NOT NULL,
  `phone` bigint(10) NOT NULL,
  `email` varchar(255) COLLATE utf32_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf32_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;


INSERT INTO `credential` (`id`, `name`, `phone`, `email`, `password`) VALUES
('8b58e', 'Ayush Agarwal', 9026483548, 'ayush.agr20@gmail.com', '$2a$10$qcWz2evOL4f/4nBJL09BtOGZZ3JjPTRC1au5PLGXYkKg.3XSsMr2a');

-- --------------------------------------------------------


CREATE TABLE `equipment` (
  `id` int(5) UNSIGNED ZEROFILL NOT NULL,
  `type` varchar(255) COLLATE utf32_unicode_ci NOT NULL,
  `brand` varchar(255) COLLATE utf32_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf32_unicode_ci NOT NULL,
  `description` varchar(300) COLLATE utf32_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf32_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf32_unicode_ci NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_on` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

ALTER TABLE `credential`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `equipment`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `equipment`
  MODIFY `id` int(5) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

