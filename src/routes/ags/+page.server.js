import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';

export function load() {
    const ags = db.prepare('select `ags`.`id` as `id`, `name`, `description`, `slots`, `waiting_list`, `mime_type` from `ags` left join `ag_images` on `ags`.`id` = `ag_images`.`id`').all();
    ags.forEach(ag => {
        if (ag.mime_type) ag.image_url = `/thumbs/${ag.id}`;
    });
    return { ags };
}
