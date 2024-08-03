import Database from 'better-sqlite3';
import { DB_PATH, SQL_INIT_PATH } from '$env/static/private';
import fs from 'node:fs';

export const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL'); // https://github.com/WiseLibs/better-sqlite3/blob/master/docs/performance.md

db.exec(fs.readFileSync(SQL_INIT_PATH, 'utf8'));

export function get_ag(id) {
    const stmt = db.prepare('select * from `ags` where `id` = ?');
    return stmt.get(id);
}

export function create_ag(name, organizer_email) {
    let id_base = name.toLowerCase()
        .replace(/ä/ig, 'ae')
        .replace(/ö/ig, 'oe')
        .replace(/ü/ig, 'ue')
        .replace(/ß/ig, 'ss')
        .replace(/[^a-z0-9]+/ig, '-');
    let id = id_base;
    for (let i = 2; get_ag(id); i ++) id = `${id_base}-${i}`;

    const stmt = db.prepare('insert into `ags`(`id`, `name`, `organizer_email`) values (?, ?, ?)');
    stmt.run(id, name, organizer_email);

    // pseudo-random character string, https://stackoverflow.com/q/1349404
    const registration_key = Math.random().toString(36).substring(2);
    db.prepare('insert into `registration_keys` values (?, ?)').run(registration_key, id);
    return registration_key;
}
