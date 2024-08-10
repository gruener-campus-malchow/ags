import { BASE_PATH } from '$env/static/private';

const COOKIE_NAME = 'session_id';
const session = {};

export function start_session(cookies) {
    const id = crypto.randomUUID();
    session[id] = {};
    cookies.set(COOKIE_NAME, id, { path: BASE_PATH });
    return session[id];
}

export function get_session(cookies) {
    return session[cookies.get(COOKIE_NAME)] || null;
}
