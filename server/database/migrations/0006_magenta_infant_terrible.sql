PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_works` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`imgSrc` text NOT NULL,
	`imgAlt` text NOT NULL,
	`category` text NOT NULL,
	`description` text NOT NULL,
	`repo` text NOT NULL,
	`link` text
);
--> statement-breakpoint
INSERT INTO `__new_works`("id", "title", "imgSrc", "imgAlt", "category", "description", "repo", "link") SELECT "id", "title", "imgSrc", "imgAlt", "category", "description", "repo", "link" FROM `works`;--> statement-breakpoint
DROP TABLE `works`;--> statement-breakpoint
ALTER TABLE `__new_works` RENAME TO `works`;--> statement-breakpoint
PRAGMA foreign_keys=ON;