import { db } from '$lib/server/db';
import { error } from '@sveltejs/kit';

export function load() {
    const ags = db.prepare('select `ags`.*, `mime_type` from `ags` left join `ag_images` on `ags`.`id` = `ag_images`.`id`').all();
    ags.forEach(ag => {
        if (ag.mime_type) ag.image_url = `/thumbs/${ag.id}`;
        ag.applied = false;
        ag.applications = 0;
    });
    return { ags };
}

export const actions = {
    apply: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id');
        if (!id) throw error(400, 'Bad Request');
        //db.prepare('')
        await new Promise((resolve) => setTimeout(resolve, 500)) // artificial delay
        return {
            ag: {
                id,
                applied: true
            }
        };
    },

    revoke: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id');
        if (!id) throw error(400, 'Bad Request');
        //db.prepare('')
        await new Promise((resolve) => setTimeout(resolve, 500)) // artificial delay
        return {
            ag: {
                id,
                applied: false
            }
        };
    },
};
