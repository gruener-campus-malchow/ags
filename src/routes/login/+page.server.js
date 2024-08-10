import { BACKEND_USER, BACKEND_PASS } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import { start_session } from '$lib/server/session';

export const actions = {
    login: async ({ request, cookies }) => {
        const data = await request.formData();
        const username = data.get('username'), password = data.get('password');
        if (!username || !password) return;

        if (username === BACKEND_USER && password === BACKEND_PASS) {
            const session = start_session(cookies);
            session.backend_auth = true;
            redirect(307, '/backend');
        }
    }
};
