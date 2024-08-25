import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';

export const GET = async ({ params, setHeaders }) => {
    if (!params.id) error(404);
    const image = db.prepare('select * from `ag_images` where `id` = ?')
        .get(params.id);
    if (!image) error(404);

    setHeaders({
        'Content-Type': image.mime_type,
        'Content-Length': image.size.toString(),
        'Last-Modified': new Date(image.last_modified * 1000).toUTCString(),
        'Cache-Control': 'public, max-age=600',
    });
    return new Response(image.data);
};
