import {error} from "@sveltejs/kit";
import {create_ag} from "$lib/server/db";
import {transporter} from "$lib/server/mail";
import {BASE_PATH, MAIL_FROM} from "$env/static/private";

export const actions = {
    default: async ({ cookies, request, url }) => {
        const data = await request.formData();
        const name = data.get('name'), organizer_email = data.get('organizer_email');
        if (!name || !organizer_email) throw error(400)
        const key = create_ag(name, organizer_email);

        transporter.sendMail({
            from: MAIL_FROM,
            to: organizer_email,
            subject: 'AG erfolgreich registriert',
            text: `Hallo,\r\n\r\n` +
                `Ihre AG »${name}« wurde erfolgreich registriert.\r\n` +
                `Unter folgendem Link können Sie zusätzliche Informationen ergänzen:\r\n` +
                `${url.origin}${BASE_PATH}register/${key}\r\n\r\n` +
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
