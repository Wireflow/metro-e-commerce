import { ReactElement } from 'react';
import { Resend } from 'resend';

import { config } from '@/config';

export const FROM_EMAIL = config.resend.fromEmail!;
export const FROM_NAME = config.resend.fromName; // Add display name constant

const resendInstance: Resend = new Resend(config.resend.apiKey);

export interface EmailData {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  cc?: string | string[];
  bcc?: string | string[];
  react?: ReactElement;
  fromName?: string; // Make the from name configurable per email
}

export const sendEmail = async ({
  to,
  subject,
  html,
  text,
  cc,
  bcc,
  react,
  fromName = FROM_NAME, // Default to constant but allow override
}: EmailData) => {
  try {
    const { data, error } = await resendInstance.emails.send({
      from: `${fromName} <${FROM_EMAIL}>`, // Format with display name
      to,
      subject,
      html,
      text,
      cc,
      bcc,
      react: react || undefined,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Failed to send email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    };
  }
};
