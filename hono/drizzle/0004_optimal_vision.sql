DROP TABLE `blacklisted_tokens`;--> statement-breakpoint
ALTER TABLE `auth` MODIFY COLUMN `key` varchar(191) NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` MODIFY COLUMN `id` bigint AUTO_INCREMENT NOT NULL;