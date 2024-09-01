import { redirect } from '@sveltejs/kit';
import { get_session } from '$lib/server/session';

export function load({ cookies }) {
    const session = get_session(cookies);
    if (!session?.backend_auth) redirect(307, '/login');
}
