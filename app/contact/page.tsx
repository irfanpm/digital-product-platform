import { PolicyPage } from '@/components/PolicyPage';
export default function ContactPage() {
  const email = process.env.SUPPORT_EMAIL?.trim();
  const valid = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return <PolicyPage title="Contact & Support"><section><h2>Purchase and download help</h2>{valid ? <p>Email <a href={`mailto:${email}`}>{email}</a> with your order ID and a description of the issue.</p> : <p>Reply to your purchase email, or contact the seller through the channel where you purchased the kit. Include your order ID and payment ID so the seller can locate the purchase.</p>}<p>Do not send your card details, UPI PIN or passwords.</p></section><section><h2>Payment awaiting verification?</h2><p>Return to checkout and use “Retry payment verification”. Do not pay again. Your download becomes available after the matching payment is verified.</p></section><section><h2>Getting started</h2><p>Extract the entire ZIP. Open START-HERE.html in Chrome or Edge on your computer. Read the included Start Here guide and use Learn & Support for workflow guidance. Keep exported backups of your projects.</p></section></PolicyPage>;
}
