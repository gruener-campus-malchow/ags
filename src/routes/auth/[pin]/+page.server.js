import { db } from '$lib/server/db';
import { error, redirect } from '@sveltejs/kit';
import { start_session } from '$lib/server/session';

export function load({ params, cookies }) {
    const student = db.prepare('select * from `students` where `pin` = ?')
        .get(params.pin);
    if (!student) error(404);

    const session = start_session(cookies);
    session.student_id = student.id;
    redirect(307, '/');
}
