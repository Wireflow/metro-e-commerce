import { NextResponse } from 'next/server';

import { sendEmail } from '@/lib/resend';
import { AuthenticatedRequest } from '@/utils/supabase/withAuth';

// const EmailSchema = z.object({
//   to: z.string(),
//   subject: z.string(),
//   html: z.string(),
// });

export const POST = async (req: AuthenticatedRequest) => {
  try {
    const body = await req.json();
    // const { user } = req;

    // if (user?.user_metadata.role !== 'admin') {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // const data = EmailSchema.safeParse(body);

    // if (!data.success) {
    //   console.error(data.error);
    //   return NextResponse.json(
    //     { error: data.error.flatten().formErrors[0], reason: data.error.flatten().formErrors[0] },
    //     {
    //       status: 400,
    //     }
    //   );
    // }
    console.log(body);

    const email = await sendEmail({
      to: body.to,
      subject: body.subject,
      html: body.html,
    });

    if (!email.success) {
      return NextResponse.json(
        {
          success: false,
          error: email.error,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, data: email.data?.data }, { status: 200 });
  } catch (error) {
    console.error('Payment API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
};
