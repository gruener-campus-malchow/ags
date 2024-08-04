import { error } from '@sveltejs/kit';
import { get_ag } from '$lib/server/db';

export function load({ params }) {
	const ag = get_ag(params.name);
	if (!ag) throw error(404);
	else return ag;
}
