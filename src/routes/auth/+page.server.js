import { error, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { start_session } from '$lib/server/session';

export const actions = {
    login: async ({ request, cookies }) => {
        const data = await request.formData();
        const pin = data.get('pin');
        if (!pin) return;
        const student = db.prepare('select * from `students` where `pin` = ?')
            .get(pin);

        if (!student) error(403, 'wrong pin');
        const session = start_session(cookies);
        session.student_id = student.id;
        redirect(307, '/');
    }
};
