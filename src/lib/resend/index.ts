import { ReactElement } from 'react';
import { Resend } from 'resend';

import { config } from '@/config';

export const FROM_EMAIL = config.resend.fromEmail;

const resendInstance: Resend = new Resend(config.resend.apiKey);

export interface EmailData {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  cc?: string | string[];
  bcc?: string | string[];
  react?: ReactElement;
}

export const sendEmail = async ({ to, subject, html, text, cc, bcc, react }: EmailData) => {
  try {
    const response = await resendInstance.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
      text,
      cc,
      bcc,
      react: react || undefined,
    });

    return { success: true, data: response };
  } catch (error) {
    console.error('Failed to send email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    };
  }
};
