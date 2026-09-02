import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISetting extends Document {
  productDriveUrl: string;
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
    productDriveUrl: {
      type: String,
      default: 'https://drive.google.com/file/d/1_Sample_All_In_One_Digital_Planner_2026_2028/view',
    },
    orderBumpDriveUrl: {
      type: String,
      default: 'https://notion.so/Sample_Planner_Bonus_Pack',
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
      default: 'admin123',
    },
    metaPixelId: {
      type: String,
      default: '123456789012345',
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
