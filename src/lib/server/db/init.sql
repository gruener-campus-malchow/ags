create table if not exists `ags` (
	`id` text unique not null,
	`name` text not null,
	`description` text,
	`slots` int,
	`waiting_list` int default 0
);

create table if not exists `registration_keys` (
    `key` text unique not null,
    `ag_id` text not null,
    foreign key(`ag_id`) references `ags`(`id`)
);

create table if not exists `ag_images` (
    `id` text unique not null,
    `mime_type` text not null,
    `last_modified` integer not null default (strftime('%s', 'now')),
    `size` integer not null,
    `data` blob not null,
    foreign key(`id`) references `ags`(`id`)
);
