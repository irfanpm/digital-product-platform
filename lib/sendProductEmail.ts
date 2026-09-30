import nodemailer from 'nodemailer';
interface Payload { toEmail: string; customerName: string; paymentId: string; amount: number; productDriveUrl: string; orderBumpDriveUrl?: string; }
const escape = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
export async function sendProductEmail(p: Payload) {
  const { SMTP_HOST: host, SMTP_USER: user, SMTP_PASS: pass } = process.env;
  if (!host || !user || !pass) return { success: false, uncertain: false };
  const port = Number(process.env.SMTP_PORT || 465);
  try {
    const transport = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass }, connectionTimeout: 10000, socketTimeout: 15000 });
    const text = `Hi ${p.customerName},\nYour Money Saving System is ready.\nSmart Excel Savings Tracker + 12 Printable Savings Challenges + Step-by-Step User Guide.\nDownload your bundle: ${p.productDriveUrl}\n${p.orderBumpDriveUrl ? 'Your extra product: ' + p.orderBumpDriveUrl : ''}\nPayment: ${p.paymentId}\nPaid: INR ${p.amount}\nReply to this email for help.`;
    const info = await transport.sendMail({ from: { name: 'Money Saving System', address: user }, to: p.toEmail, subject: 'Your Money Saving System download is ready', text,
      html: `<h1>Your Money Saving System is ready</h1><p>Hi ${escape(p.customerName)},</p><p>Your bundle includes the Smart Excel Savings Tracker, 12 Printable Savings Challenges and Step-by-Step User Guide.</p><p><a href="${escape(p.productDriveUrl)}">Open your Google Drive bundle</a></p>${p.orderBumpDriveUrl ? `<p><a href="${escape(p.orderBumpDriveUrl)}">Open your extra product</a></p>` : ''}<p>Paid: INR ${p.amount}. Payment: ${escape(p.paymentId)}</p><p>Reply to this email for help.</p>` });
    return { success: info.accepted.length > 0, uncertain: false, messageId: info.messageId };
  } catch (e: any) {
    // A timeout after SMTP DATA may mean accepted mail; never automatically resend it.
    return { success: false, uncertain: !['EAUTH', 'ECONNECTION', 'EDNS', 'EENVELOPE'].includes(e.code) && !(Number(e.responseCode) >= 400) };
  }
}
