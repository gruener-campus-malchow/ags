import { error, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { get_session } from '$lib/server/session';

export function load({ cookies }) {
    const session = get_session(cookies);
    if (!session?.student_id) error(403, 'Forbidden');

    const student = db.prepare('select * from `students` where `id` = ?')
        .get(session.student_id);

    const ags = db.prepare('select `ags`.*, `mime_type`, `applications`, `applied` from `ags`' +
        // ag images:
        ' left join `ag_images` on `ags`.`id` = `ag_images`.`id`' +
        // number of applications per ag:
        ' left join (select `ag_id`, count(*) as `applications` from `applications` group by `ag_id`) on `ags`.`id` = `ag_id`' +
        // has `session.student_id` applied to ag?
        ' left join (select `ag_id` as `ag_id2`, count(*) as `applied` from `applications` where `student_id` = ? group by `ag_id`) on `ags`.`id` = `ag_id2`').all(session.student_id);

    ags.forEach(ag => {
        if (ag.mime_type) ag.image_url = `/thumbs/${ag.id}`;
        ag.applied = !!ag.applied;
        ag.applications = ag.applications || 0;
    });
    return { student, ags };
}

export const actions = {
    apply: async ({ request, cookies }) => {
        const data = await request.formData();
        const ag_id = data.get('id');
        if (!ag_id) error(400, 'Bad Request');

        const session = get_session(cookies);
        if (!session?.student_id) error(403);
        db.prepare('insert into `applications` (`student_id`, `ag_id`) values (?, ?)')
            .run(session.student_id, ag_id);
        // get total number of applications:
        const { applications } = db.prepare('select count(*) as `applications` from `applications` where `ag_id` = ?')
            .get(ag_id);

        await new Promise((resolve) => setTimeout(resolve, 500)) // artificial delay
        return {
            ag: {
                id: ag_id,
                applied: true,
                applications
            }
        };
    },

    revoke: async ({ request, cookies }) => {
        const data = await request.formData();
        const ag_id = data.get('id');
        if (!ag_id) error(400, 'Bad Request');

        const session = get_session(cookies);
        if (!session?.student_id) error(403);
        db.prepare('delete from `applications` where `student_id` = ? and `ag_id` = ?')
            .run(session.student_id, ag_id);
        // get total number of applications:
        const { applications } = db.prepare('select count(*) as `applications` from `applications` where `ag_id` = ?')
            .get(ag_id);

        await new Promise((resolve) => setTimeout(resolve, 500)) // artificial delay
        return {
            ag: {
                id: ag_id,
                applied: false,
                applications
            }
        };
    },
};
