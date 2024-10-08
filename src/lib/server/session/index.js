import { env } from '$env/dynamic/private';

const COOKIE_NAME = 'session_id';
const session = {};

// todo: destroy session
export function start_session(cookies) {
    const id = crypto.randomUUID();
    session[id] = {};
    cookies.set(COOKIE_NAME, id, { path: env.BASE_PATH });
    return session[id];
}

export function get_session(cookies) {
    return session[cookies.get(COOKIE_NAME)] || null;
}
