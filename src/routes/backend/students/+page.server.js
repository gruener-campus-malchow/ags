import { db } from '$lib/server/db';
import { parse } from 'csv/sync';
import { error } from '@sveltejs/kit';

export const actions = {
    upload_students: async ({ request }) => {
        const data = await request.formData();
        const file = data.get('csv');
        if (!file || file.type !== 'text/csv') error(400);

        const students = parse(await file.text())
        const stmt = db.prepare('insert into `students`(`last_name`, `first_name`, `class`, `email`) values (?, ?, ?, ?)');
        students.forEach(student => stmt.run(...student));
    }
};
