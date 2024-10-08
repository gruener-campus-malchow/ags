import { error } from '@sveltejs/kit';
import { create_ag } from '$lib/server/db';
import { transporter } from '$lib/server/mail';
import { env } from '$env/dynamic/private';

export const actions = {
    create_ag: async ({ request, url }) => {
        const data = await request.formData();
        const name = data.get('ag_name'), organizer_email = data.get('organizer_email');
        if (!name || !organizer_email) error(400)
        const key = create_ag(name, organizer_email);

        transporter.sendMail({
            from: env.MAIL_FROM,
            to: [organizer_email],
            subject: 'AG erfolgreich registriert',
            text: `Hallo,\r\n\r\n` +
                `Ihre AG »${name}« wurde erfolgreich registriert.\r\n` +
                `Unter folgendem Link können Sie zusätzliche Informationen ergänzen:\r\n` +
                `${url.origin}${env.BASE_PATH}ags/${key}\r\n\r\n` +
                `Mit freundlichen Grüßen\r\n` +
                `Das AG-Team des Grünen Campus Malchow\r\n\r\n` +
                `--\r\n` +
                `Diese E-Mail wurde automatisch erstellt und ist ohne Unterschrift gültig.`,
        }, (err, info) => {
            if (err) console.error(err)
            else console.log(info)
        });
    }
};
