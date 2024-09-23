CREATE TABLE `test-task_qna` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`question` text,
	`session_id` text,
	`answer` text,
	`user_id` integer,
	`crated_at` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)),
	FOREIGN KEY (`user_id`) REFERENCES `test-task_users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `test-task_users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_identifier` text,
	`crated_at` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer))
);
