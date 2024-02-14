import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.MAIL_DOMAIN;

export const sendVerificationEmail = async (
  email: string,
  token: string,
  isPasswordSet: boolean = false,
  isResetPassword: boolean = false,
) => {
  const confirmLink = `${
    process.env.MAIL_DOMAIN
  }/auth/confirm-email?token=${token}&is-password-set=${isPasswordSet ? 1 : 0}${
    isResetPassword ? "&is-reset-password=1" : ""
  }`;

  isPasswordSet ? 1 : 0;

  const { data, error } = await resend.emails.send({
    from: "mail@vetmanage.uk",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};

export const sendResetPassword = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/reset/password?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "mail@vetmanage.uk",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${confirmLink}">here</a> to reset your password.</p>`,
  });
};
