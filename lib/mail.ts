import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
  email: string,
  token: string,
  isPasswordSet: boolean = false,
) => {
  const confirmLink = `${
    process.env.MAIL_DOMAIN
  }/auth/confirm-email?token=${token}&is-password-set=${isPasswordSet ? 1 : 0}`;

  console.log(isPasswordSet ? 1 : 0);

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};
