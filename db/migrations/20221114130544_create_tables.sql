-- migrate:up

CREATE TABLE IF NOT EXISTS `users` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nickname` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) UNIQUE NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT (now()),
  `updated_at` DATETIME default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL COMMENT 'update time'
);

CREATE TABLE IF NOT EXISTS `books` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `title` varchar(250) NOT NULL,
  `cover_img` varchar(250) NOT NULL,
  `toc` varchar(10000),
  `introduction` varchar(3000) NOT NULL,
  `categories_id` int NOT NULL,
  `publish_time` varchar(100),
  `publisher` varchar(100),
  `page` int,
  `rating_score` decimal(3,1),
  `created_at` DATETIME NOT NULL DEFAULT (now()),
  `updated_at` DATETIME default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL COMMENT 'update time'
);

CREATE TABLE IF NOT EXISTS `authors` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `author_name` varchar(50) NOT NULL,
  `author_intro` varchar(3000) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT (now()),
  `updated_at` DATETIME default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL COMMENT 'update time'
);

CREATE TABLE IF NOT EXISTS `books_authors` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `authors_id` int NOT NULL,
  `books_id` int NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT (now()),
  `updated_at` DATETIME default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL COMMENT 'update time'
);

CREATE TABLE IF NOT EXISTS `reviews` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `content` varchar(300) NOT NULL,
  `books_id` int NOT NULL,
  `users_id` int NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT (now()),
  `updated_at` DATETIME default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL COMMENT 'update time'
);

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `content` varchar(100) NOT NULL UNIQUE,
  `created_at` DATETIME NOT NULL DEFAULT (now()),
  `updated_at` DATETIME default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL COMMENT 'update time'
);

CREATE TABLE IF NOT EXISTS `favorites` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `users_id` int NOT NULL,
  `books_id` int NOT NULL
);

CREATE TABLE IF NOT EXISTS `bookshelves` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `users_id` int NOT NULL,
  `books_id` int NOT NULL
);

CREATE UNIQUE INDEX `favorites` ON `favorites` (`users_id`, `books_id`);
 
CREATE UNIQUE INDEX `bookshelves` ON `bookshelves` (`users_id`, `books_id`);

ALTER TABLE `books_authors` ADD FOREIGN KEY (`authors_id`) REFERENCES `authors` (`id`);

ALTER TABLE `books_authors` ADD FOREIGN KEY (`books_id`) REFERENCES `books` (`id`);

ALTER TABLE `reviews` ADD FOREIGN KEY (`books_id`) REFERENCES `books` (`id`);

ALTER TABLE `reviews` ADD FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

ALTER TABLE `books` ADD FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`);

ALTER TABLE `favorites` ADD FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

ALTER TABLE `favorites` ADD FOREIGN KEY (`books_id`) REFERENCES `books` (`id`);

ALTER TABLE `bookshelves` ADD FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

ALTER TABLE `bookshelves` ADD FOREIGN KEY (`books_id`) REFERENCES `books` (`id`);


-- migrate:down

SET foreign_key_checks = 0;

DROP TABLE users;
DROP TABLE books;
DROP TABLE authors;
DROP TABLE books_authors;
DROP TABLE reviews;
DROP TABLE categories;
DROP TABLE favorites;
DROP TABLE bookshelves;

SET foreign_key_checks = 1;