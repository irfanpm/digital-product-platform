import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISetting extends Document {
  productDriveUrl: string;
  orderBumpDriveUrl: string;
  basePrice: number;
  bumpPrice: number;
  adminPin: string;
  metaPixelId: string;
  updatedAt: Date;
}

const SettingSchema: Schema = new Schema<ISetting>(
  {
    productDriveUrl: {
      type: String,
      default: 'https://drive.google.com/file/d/1_Sample_AI_Job_Application_Kit_38Page/view',
    },
    orderBumpDriveUrl: {
      type: String,
      default: 'https://notion.so/Sample_10_Word_Templates_And_Job_Tracker_Dashboard',
    },
    basePrice: {
      type: Number,
      default: 299,
    },
    bumpPrice: {
      type: Number,
      default: 99,
    },
    adminPin: {
      type: String,
      default: 'admin123',
    },
    metaPixelId: {
      type: String,
      default: '123456789012345',
    },
  },
  {
    timestamps: true,
  }
);

const Setting: Model<ISetting> =
  mongoose.models.Setting || mongoose.model<ISetting>('Setting', SettingSchema);

export default Setting;
