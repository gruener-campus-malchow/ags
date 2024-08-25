import { db } from '$lib/server/db';
import { parse } from 'csv/sync';
import { error } from '@sveltejs/kit';

export function load() {
    const students = db.prepare('select * from `students`').all();
    return { students };
}

export const actions = {
    upload_students: async ({ request }) => {
        const data = await request.formData();
        const file = data.get('csv');
        if (!file || file.type !== 'text/csv') error(400);

        const students = parse(await file.text())
        // todo: generate unique, secure pins
        const generate_pin = () => Math.floor(Math.random() * 100000);
        const stmt = db.prepare('insert into `students`(`last_name`, `first_name`, `class`, `email`, `pin`) values (?, ?, ?, ?, ?)');
        students.forEach(student => stmt.run(...student, generate_pin()));
    }
};
