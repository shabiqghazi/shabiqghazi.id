import { defineEventHandler, readBody } from "h3";
import { getHttpClient } from "~/lib/httpClient";
import nodemailer from "nodemailer";

type RecaptchaResponse = {
  success: boolean;
  score?: number;
};
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();
  const httpClient = getHttpClient();

  // Verifikasi reCAPTCHA
  const res = await httpClient<RecaptchaResponse>(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      body: new URLSearchParams({
        secret: config.captchaSecretKey,
        response: body.recaptcha_token,
      }),
    }
  );

  if (!res.success || (res.score ?? 0) < 0.5) {
    throw createError({
      statusCode: 403,
      message: "Failed to verify reCAPTCHA",
    });
  }

  // Konfigurasi transporter untuk Gmail
  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: false, // true untuk port 465, false untuk port lainnya
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  });

  try {
    // Kirim email
    await transporter.sendMail({
      from: `"Website Contact Form" <${config.smtpUser}>`,
      to: config.smtpUser, // Email tujuan (ke email Anda sendiri)
      replyTo: body.email, // Email pengirim untuk reply
      subject: `Pesan Baru dari ${body.name}`,
      text: `
        Nama: ${body.name}
        Email: ${body.email}

        Pesan:
        ${body.message}
      `,
      html: `
        <h2>Pesan Baru dari Website</h2>
        <p><strong>Nama:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Pesan:</strong></p>
        <p>${body.message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return {
      message: "Email Sent Successfully",
      data: {
        name: body.name,
        email: body.email,
      },
    };
  } catch (error) {
    console.error("Error sending email:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to send email",
    });
  }
});
