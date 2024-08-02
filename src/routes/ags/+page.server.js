import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';

export function load() {
    const ags = db.prepare('select `name`,`description`, `slots`, `waiting_list` from `ags`').all();
    return { ags };
}
