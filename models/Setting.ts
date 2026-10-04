import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISetting extends Document {
  productDriveUrl: string;
  productSlug: string;
  deliveryMode: string;
  previousProductDriveUrl?: string;
  orderBumpDriveUrl: string;
  basePrice: number;
  bumpPrice: number;
  adminPin: string;
  metaPixelId: string;
  enableOrderBump: boolean;
  updatedAt: Date;
}

const SettingSchema: Schema = new Schema<ISetting>(
  {
    productSlug: { type: String, default: '' },
    deliveryMode: { type: String, enum: ['package', 'drive'], default: 'package' },
    previousProductDriveUrl: { type: String, default: '' },
    productDriveUrl: {
      type: String,
      default: '',
    },
    orderBumpDriveUrl: {
      type: String,
      default: '',
    },
    basePrice: {
      type: Number,
      default: 199,
    },
    bumpPrice: {
      type: Number,
      default: 99,
    },
    adminPin: {
      type: String,
      default: '',
    },
    metaPixelId: {
      type: String,
      default: '',
      trim: true,
      validate: (value: string) => value === '' || /^\d{5,25}$/.test(value),
    },
    enableOrderBump: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

if (mongoose.models && mongoose.models.Setting) {
  delete (mongoose.models as any).Setting;
}

const Setting: Model<ISetting> = mongoose.model<ISetting>('Setting', SettingSchema);

export default Setting;
