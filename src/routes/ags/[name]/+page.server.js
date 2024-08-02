import { error } from '@sveltejs/kit';
import { db, get_ag, create_ag } from '$lib/server/db';

export function load({ params }) {
	//const ag = get_ag(params.name);
	const stmt = db.prepare('select `name`, `description`, `slots` from `ags` where `id` = ?');
	const ag = stmt.get(params.name);
	if (!ag) throw error(404);
	else return ag;
}
