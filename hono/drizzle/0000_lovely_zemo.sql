CREATE TABLE `auth` (
	`key` varchar(191)
);
--> statement-breakpoint
CREATE TABLE `blacklisted_tokens` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`token` varchar(500) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`expires_at` timestamp NOT NULL,
	CONSTRAINT `blacklisted_tokens_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`username` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`address` varchar(300) NOT NULL,
	`phone` varchar(300) NOT NULL,
	CONSTRAINT `posts_id` PRIMARY KEY(`id`)
);
