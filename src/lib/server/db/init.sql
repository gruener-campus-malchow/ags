create table if not exists `ags` (
	`id` text unique not null,
	`name` text not null,
	`description` text,
	`slots` int,
	`waiting_list` int default 0,
	`organizer_email` text not null
);

create table if not exists `registration_keys` (
    `key` text unique not null,
    `ag_id` text not null,
    foreign key(`ag_id`) references `ags`(`id`)
);
