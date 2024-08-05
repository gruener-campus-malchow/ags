import { db } from '$lib/server/db';
import { error } from '@sveltejs/kit';

export function load() {
    const ags = db.prepare('select `ags`.*, `mime_type` from `ags` left join `ag_images` on `ags`.`id` = `ag_images`.`id`').all();
    ags.forEach(ag => {
        if (ag.mime_type) ag.image_url = `/thumbs/${ag.id}`;
        ag.subscribed = false;
    });
    return { ags };
}

export const actions = {
    subscribe: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id');
        if (!id) throw error(400);
        console.log(data)
        //db.prepare('')
        return {
            ag: {
                id,
                subscribed: true
            }
        };
    },

    unsubscribe: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id');
        if (!id) throw error(400);
        //db.prepare('')
        return {
            ag: {
                id,
                subscribed: false
            }
        };
    },
};
