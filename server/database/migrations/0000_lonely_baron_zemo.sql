CREATE TABLE `competences` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`categorie` text NOT NULL,
	`rate` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `competences_categorie_unique` ON `competences` (`categorie`);--> statement-breakpoint
CREATE TABLE `opinions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`firstName` text NOT NULL,
	`lastName` text NOT NULL,
	`job` text NOT NULL,
	`imgSrc` text NOT NULL,
	`imgAlt` text NOT NULL,
	`link` text NOT NULL,
	`opinion` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `works` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`imgSrc` text NOT NULL,
	`imgAlt` text NOT NULL,
	`category` text NOT NULL,
	`description` text NOT NULL,
	`repo` text NOT NULL,
	`link` text NOT NULL
);
