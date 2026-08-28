import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrder extends Document {
  orderId: string;
  paymentId?: string;
  name: string;
  email: string;
  phone: string;
  amount: number;
  hasOrderBump: boolean;
  package: string;
  status: string; // 'Created', 'Captured', 'Failed'
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema<IOrder>(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    paymentId: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    phone: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    hasOrderBump: {
      type: Boolean,
      default: false,
    },
    package: {
      type: String,
      default: 'The AI Job Application Kit',
    },
    status: {
      type: String,
      default: 'Created',
      enum: ['Created', 'Captured', 'Failed', 'Refunded'],
    },
  },
  {
    timestamps: true,
  }
);

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
