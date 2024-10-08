import { db } from '$lib/server/db';
import { parse } from 'csv/sync';
import { error } from '@sveltejs/kit';

export function load() {
    /*const ags = db.prepare('select `id` from `ags`').all().map(a => a.id)
    for (let i = 0; i < 1000; i ++) db.prepare('insert into applications(ag_id, student_id) values (?,?)')
        .run(ags[Math.floor(Math.random()*ags.length)], Math.floor(Math.random()*1000))*/
    const students = db.prepare('select * from `students`').all();
    return { students };
}

export const actions = {
    upload_students: async ({ request }) => {
        const data = await request.formData();
        const file = data.get('csv');
        if (!file || file.type !== 'text/csv') error(400);

        const students = parse(await file.text())
        const generate_pin = () => Math.random().toString(36).substring(2);
        const stmt = db.prepare('insert into `students`(`last_name`, `first_name`, `class`, `email`, `pin`) values (?, ?, ?, ?, ?)');
        students.forEach(student => stmt.run(...student, generate_pin()));
    }
};
