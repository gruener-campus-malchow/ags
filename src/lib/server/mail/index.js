import {createTransport} from "nodemailer";
import {SMTP_HOST, SMTP_PASS, SMTP_PORT, SMTP_USER} from "$env/static/private";

export const transporter = createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
    },
});
