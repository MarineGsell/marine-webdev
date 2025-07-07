PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_opinions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`firstName` text NOT NULL,
	`lastName` text NOT NULL,
	`job` text NOT NULL,
	`imgSrc` text,
	`imgAlt` text,
	`link` text,
	`opinion` text NOT NULL,
	`isValidated` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_opinions`("id", "firstName", "lastName", "job", "imgSrc", "imgAlt", "link", "opinion", "isValidated") SELECT "id", "firstName", "lastName", "job", "imgSrc", "imgAlt", "link", "opinion", "isValidated" FROM `opinions`;--> statement-breakpoint
DROP TABLE `opinions`;--> statement-breakpoint
ALTER TABLE `__new_opinions` RENAME TO `opinions`;--> statement-breakpoint
PRAGMA foreign_keys=ON;