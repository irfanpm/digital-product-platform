import nodemailer from 'nodemailer';

interface ProductEmailPayload {
  toEmail: string;
  customerName: string;
  paymentId: string;
  amount: number;
  productDriveUrl: string;
  hasOrderBump?: boolean;
  orderBumpDriveUrl?: string;
}

export async function sendProductEmail({
  toEmail,
  customerName,
  paymentId,
  amount,
  productDriveUrl,
}: ProductEmailPayload) {
  try {
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const smtpUser = process.env.SMTP_USER || process.env.ALERT_EMAIL || 'muhammedirfanpm@gmail.com';
    const smtpPass = process.env.SMTP_PASS || '';

    if (!smtpPass) {
      console.warn('SMTP_PASS is not configured. Simulating email dispatch to:', toEmail);
      return { success: true, simulated: true };
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #fdf2f8; margin: 0; padding: 20px; color: #1e293b; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 24px; padding: 36px; border: 1px solid #fbcfe8; box-shadow: 0 10px 25px -5px rgba(244, 63, 94, 0.1); }
            .header { text-align: center; border-bottom: 2px solid #fdf2f8; padding-bottom: 24px; }
            .badge { display: inline-block; background: #ffe4e6; color: #e11d48; font-weight: 800; font-size: 11px; padding: 6px 14px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 1px; }
            .title { font-size: 24px; font-weight: 900; color: #0f172a; margin: 16px 0 8px 0; }
            .content { padding: 24px 0; font-size: 14px; line-height: 1.6; }
            .btn-main { display: block; text-align: center; background: linear-gradient(135deg, #f43f5e, #9333ea); color: #ffffff !important; text-decoration: none; font-weight: 900; font-size: 16px; padding: 18px 28px; border-radius: 16px; margin: 24px 0; box-shadow: 0 10px 20px rgba(244, 63, 94, 0.3); }
            .receipt { background: #f8fafc; border-radius: 16px; padding: 18px; font-size: 12px; margin-top: 24px; border: 1px solid #e2e8f0; }
            .receipt-row { display: flex; justify-content: space-between; margin-bottom: 6px; }
            .footer { text-align: center; font-size: 11px; color: #94a3b8; margin-top: 28px; border-top: 1px solid #f1f5f9; padding-top: 18px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <span class="badge">🌸 Payment Confirmed</span>
              <h1 class="title">Your All-In-One Digital Planner Is Ready!</h1>
              <p style="margin: 0; color: #64748b; font-size: 13px;">Plan Better. Stay Organized. Achieve More.</p>
            </div>

            <div class="content">
              <p>Hi <strong>${customerName}</strong>,</p>
              <p>Thank you for purchasing the <strong>All-In-One Digital Planner (2026-2028 Edition)</strong>! Your instant Google Drive download bundle is ready below:</p>

              <a href="${productDriveUrl}" class="btn-main" target="_blank">
                📥 Open & Download 600+ Page Digital Planner Bundle
              </a>

              <h3 style="font-size: 14px; font-weight: 800; color: #0f172a; margin-top: 24px;">📦 What's Inside Your Bundle:</h3>
              <ul style="padding-left: 20px; font-size: 13px; color: #475569;">
                <li>2026, 2027 & 2028 Dated Hyperlinked Digital Planners (Rainbow Theme)</li>
                <li>Undated Reusable Life Planner Edition</li>
                <li>5,000+ Pre-Cropped Aesthetic Digital Stickers (PNG + GoodNotes)</li>
                <li>150 Customizable Covers & Ring Binders</li>
                <li>100+ Productivity, Finance, Wellness & Habit Templates</li>
                <li>Step-by-Step Video Setup Guides for iPad (GoodNotes/Notability) & Android (Penly)</li>
              </ul>

              <div class="receipt">
                <div class="receipt-row"><span><strong>Payment ID:</strong></span><span style="font-family: monospace;">${paymentId}</span></div>
                <div class="receipt-row"><span><strong>Amount Paid:</strong></span><span>₹${amount} INR</span></div>
                <div class="receipt-row"><span><strong>Delivery:</strong></span><span style="color: #059669; font-weight: bold;">Instant Google Drive Access</span></div>
              </div>
            </div>

            <div class="footer">
              <p>Need setup assistance? Reply to this email or contact support at <a href="mailto:muhammedirfanpm@gmail.com" style="color: #e11d48;">muhammedirfanpm@gmail.com</a>.</p>
              <p>© ${new Date().getFullYear()} Digital Planner Studio. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const mailOptions = {
      from: `"Digital Planner Studio" <${smtpUser}>`,
      to: toEmail,
      subject: `🌸 Your All-In-One Digital Planner (2026-2028) Download Is Ready!`,
      html: emailHtml,
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error('sendProductEmail Error:', error);
    return { success: false, error: error.message };
  }
}
