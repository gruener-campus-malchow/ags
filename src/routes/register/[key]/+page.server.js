import {db} from '$lib/server/db/index.js';
import {error} from '@sveltejs/kit';

export function load({ params }) {
    const ag = db.prepare('select `id`, `name`, `description`, `slots` from `ags`, `registration_keys` where `id` = `ag_id` and `key` = ?')
        .get(params.key);
    return {
        key: params.key,
        ...ag,
    };
}

export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();
        const key = data.get('key'), description = data.get('description'), slots = data.get('slots');
        if (!description || !slots) throw error(400);

        db.prepare('update `ags` set `description` = ?, slots = ? where `id` = (select `ag_id` from `registration_keys` where `key` = ?)')
            .run(description, slots, key);
    }
};
