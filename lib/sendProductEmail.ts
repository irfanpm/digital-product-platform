import nodemailer from 'nodemailer';

interface EmailPayload {
  toEmail: string;
  customerName: string;
  paymentId: string;
  amount: number;
  productDriveUrl: string;
  hasOrderBump: boolean;
  orderBumpDriveUrl?: string;
}

export async function sendProductEmail(payload: EmailPayload) {
  const {
    toEmail,
    customerName,
    paymentId,
    amount,
    productDriveUrl,
    hasOrderBump,
    orderBumpDriveUrl,
  } = payload;

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || '"AI Job Kit Support" <support@aijobkit.in>';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Your AI Job Application Kit Download Link</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 32px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
        .badge { display: inline-block; background: #dcfce7; color: #166534; font-size: 12px; font-weight: bold; padding: 4px 12px; border-radius: 9999px; margin-bottom: 12px; }
        h1 { font-size: 24px; font-weight: 800; color: #0f172a; margin-top: 0; }
        p { font-size: 14px; line-height: 1.6; color: #475569; }
        .btn { display: inline-block; background: #059669; color: #ffffff !important; text-decoration: none; font-weight: 800; font-size: 16px; padding: 14px 28px; border-radius: 12px; margin: 16px 0; text-align: center; }
        .btn-secondary { display: inline-block; background: #0f172a; color: #ffffff !important; text-decoration: none; font-weight: bold; font-size: 14px; padding: 12px 24px; border-radius: 10px; margin: 8px 0; }
        .receipt { background: #f1f5f9; padding: 16px; border-radius: 12px; font-size: 13px; margin: 20px 0; }
        .receipt-row { display: flex; justify-content: space-between; margin-bottom: 6px; }
        .footer { font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; pt: 16px; margin-top: 24px; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <span class="badge">🎉 PAYMENT CONFIRMED</span>
        <h1>Hello ${customerName}, Your Order Is Complete!</h1>
        <p>Thank you for purchasing <strong>The AI Job Application Kit (38-Page Career Operating System)</strong>. Your digital product access links are active below:</p>
        
        <div style="text-align: center; margin: 24px 0;">
          <a href="${productDriveUrl}" target="_blank" class="btn">
            ⬇️ Click Here to Access Google Drive Kit PDF
          </a>
        </div>

        ${
          hasOrderBump && orderBumpDriveUrl
            ? `
          <div style="background: #f0fdf4; border: 1px border #bbf7d0; padding: 16px; border-radius: 12px; margin: 16px 0;">
            <p style="margin: 0 0 8px 0; font-weight: bold; color: #166534;">🌟 Order Bump Add-on Included:</p>
            <a href="${orderBumpDriveUrl}" target="_blank" class="btn-secondary">
              📂 Access 10 Editable Word & Notion Templates
            </a>
          </div>
          `
            : ''
        }

        <div class="receipt">
          <div style="font-weight: bold; margin-bottom: 8px;">Order & Receipt Summary:</div>
          <div>Payment ID: <strong>${paymentId}</strong></div>
          <div>Total Paid: <strong>₹${amount} INR</strong></div>
          <div>Delivery Email: <strong>${toEmail}</strong></div>
        </div>

        <p>If you have any questions or need technical support, reply directly to this email or reach us at <a href="mailto:support@aijobkit.in">support@aijobkit.in</a>.</p>

        <div class="footer">
          © ${new Date().getFullYear()} AI Job Application Kit • Instant Digital Delivery System
        </div>
      </div>
    </body>
    </html>
  `;

  if (host && user && pass) {
    try {
      const transporter = nodemailer.createTransport({
        host: host,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: user,
          pass: pass,
        },
      });

      const textContent = `
Hello ${customerName},

Thank you for your order! Your payment has been confirmed.
Payment ID: ${paymentId}
Amount: ₹${amount}

You can access your AI Job Application Kit PDF here:
${productDriveUrl}

${hasOrderBump && orderBumpDriveUrl ? `Your Order Bump Templates: ${orderBumpDriveUrl}\n` : ''}
If you have any questions, reply to this email.
      `;

      const info = await transporter.sendMail({
        from: from,
        replyTo: user,
        to: toEmail,
        subject: `Your Order #${paymentId} - AI Job Application Kit Download`,
        text: textContent,
        html: htmlContent,
      });

      console.log('Automated Product Email Sent:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (err) {
      console.error('Nodemailer send error:', err);
      return { success: false, error: err };
    }
  } else {
    console.log(`[SIMULATED EMAIL DISPATCH] Sent to ${toEmail} with Drive URL: ${productDriveUrl}`);
    return { success: true, simulated: true };
  }
}
