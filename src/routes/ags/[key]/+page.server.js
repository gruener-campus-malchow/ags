import { db } from '$lib/server/db';
import { error } from '@sveltejs/kit';

export function load({ params }) {
    const ag = db.prepare('select `ags`.* , `last_modified` from `ags` left join `ag_images` on `ags`.`id` = `ag_images`.`id`, `registration_keys` where `ags`.`id` = `ag_id` and `key` = ?')
        .get(params.key);
    if (!ag) error(404);
    return {
        key: params.key,
        image_url: ag.last_modified ? `/thumbs/${ag.id}?v=${ag.last_modified}` : null,
        ...ag,
    };
}

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const key = data.get('key'), name = data.get('name'), description = data.get('description'), slots = data.get('slots');
        const ag_id = get_ag_from_key(key);
        if (!ag_id || !name || !slots) error(400, 'Ein erforderliches Feld wurde nicht ausgefüllt.');
        const min_grade = data.get('min_grade') || null, max_grade = data.get('max_grade') || null;

            db.prepare('update `ags` set `description` = ?, `name` = ?, `slots` = ?, `min_grade` = ?, `max_grade` = ? where `id` = ?')
            .run(description, name, slots, min_grade, max_grade, ag_id);

        const image = data.get('image');
        if (image) {
            // todo: resize image
            if (!image.type.match(/^image\/(png|jpe?g|svg\+xml)$/i)) return;
            const buffer = Buffer.from(await image.arrayBuffer());
            db.prepare('replace into `ag_images` (`id`, `mime_type`, `size`, `data`) values (?, ?, ?, ?)')
                .run(ag_id, image.type, image.size, buffer);
        }
    }
};

function get_ag_from_key(key) {
    return db.prepare('select `ag_id` from `registration_keys` where `key` = ?')
        .get(key).ag_id;
}
