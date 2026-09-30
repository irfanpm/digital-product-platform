import mongoose, { Schema } from 'mongoose';
const schema = new Schema({
  orderId: { type: String, required: true, unique: true, index: true },
  paymentId: String, name: { type: String, required: true }, email: { type: String, required: true }, phone: String,
  amount: { type: Number, required: true }, amountPaise: Number, currency: String, bumpAmount: Number,
  hasOrderBump: { type: Boolean, default: false }, package: { type: String, default: 'Money Saving System' },
  status: { type: String, enum: ['Created', 'Captured', 'Failed', 'Refunded'], default: 'Created' },
  verificationVersion: Number, verifiedAt: Date, mode: String, keyId: String,
  deliveryUrl: String, orderBumpUrl: String,
  emailStatus: { type: String, enum: ['Pending', 'Sending', 'Sent', 'Failed', 'Unknown'], default: 'Pending' },
  emailClaim: String, emailSentAt: Date, emailMessageId: String, purchaseEventClaimedAt: Date,
}, { timestamps: true });
export default mongoose.models.Order || mongoose.model('Order', schema);
