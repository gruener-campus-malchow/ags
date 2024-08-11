create table if not exists `ags` (
	`id` text unique not null,
	`name` text not null,
	`description` text,
	`slots` int,
	`min_grade` int,
	`max_grade` int
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


create table if not exists `students` (
    `id` integer primary key,
    `first_name` text not null,
    `last_name` text not null,
    `class` text not null, -- ahh
    `email` text not null,
    `pin` integer
);

create table if not exists `applications` (
    `student_id` integer not null,
    `ag_id` text not null,
    `priority` int not null default 0,
    `accepted` boolean not null default FALSE,
    foreign key(`student_id`) references `students`(`id`),
    foreign key(`ag_id`) references `ags`(`id`)
);
