import nodemailer from 'nodemailer';
import { PRODUCT } from './product';
interface Payload { toEmail: string; customerName: string; paymentId: string; amount: number; productDriveUrl: string; orderBumpDriveUrl?: string; productName?: string; }
const escape = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
export async function sendProductEmail(p: Payload) {
  const { SMTP_HOST: host, SMTP_USER: user, SMTP_PASS: pass } = process.env;
  if (!host || !user || !pass) return { success: false, uncertain: false };
  const port = Number(process.env.SMTP_PORT || 465);
  try {
    const name = p.productName || PRODUCT.name;
    const creator = name === PRODUCT.name;
    const contents = creator ? PRODUCT.description : name === 'Money Saving System' ? 'Smart Excel Savings Tracker + 12 Printable Savings Challenges + Step-by-Step User Guide.' : 'Your purchased digital product.';
    const start = creator ? PRODUCT.start : 'Open your purchase link to access your original product.';
    const transport = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass }, connectionTimeout: 10000, socketTimeout: 15000 });
    const text = `Hi ${p.customerName},\nYour ${name} payment is verified.\n${contents}\nDownload your product: ${p.productDriveUrl}\nStart here: ${start}\n${p.orderBumpDriveUrl ? 'Your extra product: ' + p.orderBumpDriveUrl : ''}\nPayment: ${p.paymentId}\nPaid: INR ${p.amount}\nReply to this email for help.`;
    const info = await transport.sendMail({ from: { name, address: user }, to: p.toEmail, subject: `Your ${name} download is ready`, text,
      html: `<h1>Welcome to ${escape(name)}</h1><p>Hi ${escape(p.customerName)}, your payment is verified.</p><p>${escape(contents)}</p><p><a href="${escape(p.productDriveUrl)}">Download ${escape(name)}</a></p><h2>Start here</h2><p>${escape(start)}</p>${p.orderBumpDriveUrl ? `<p><a href="${escape(p.orderBumpDriveUrl)}">Open your extra product</a></p>` : ''}<p>Paid: INR ${p.amount}. Payment: ${escape(p.paymentId)}</p><p>Reply to this email for help.</p>` });
    return { success: info.accepted.length > 0, uncertain: false, messageId: info.messageId };
  } catch (e: any) {
    // A timeout after SMTP DATA may mean accepted mail; never automatically resend it.
    return { success: false, uncertain: !['EAUTH', 'ECONNECTION', 'EDNS', 'EENVELOPE'].includes(e.code) && !(Number(e.responseCode) >= 400) };
  }
}
