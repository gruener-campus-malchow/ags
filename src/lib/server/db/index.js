import Database from 'better-sqlite3';
import { env } from '$env/dynamic/private';
import fs from 'node:fs';
import { building } from '$app/environment';

export const db = new Database(env.DB_PATH);
db.pragma('journal_mode = WAL'); // https://github.com/WiseLibs/better-sqlite3/blob/master/docs/performance.md

if (!building) {
    db.exec(fs.readFileSync(env.SQL_INIT_PATH, 'utf8'));
}

export function create_ag(name, organizer_email) {
    let id_base = name.toLowerCase()
        .replace(/ä/ig, 'ae')
        .replace(/ö/ig, 'oe')
        .replace(/ü/ig, 'ue')
        .replace(/ß/ig, 'ss')
        .replace(/[^a-z0-9]+/ig, '-');
    let id = id_base;
    for (let i = 2; get_ag(id); i++) id = `${id_base}-${i}`;

    const stmt = db.prepare('insert into `ags`(`id`, `name`) values (?, ?)');
    stmt.run(id, name);

    // pseudo-random character string, https://stackoverflow.com/q/1349404
    const registration_key = Math.random().toString(36).substring(2);
    db.prepare('insert into `registration_keys` values (?, ?)').run(registration_key, id);
    return registration_key;
}
