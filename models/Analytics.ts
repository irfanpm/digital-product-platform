import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAnalytics extends Document {
  date: string; // YYYY-MM-DD
  pageViews: number;
  uniqueVisitors: number;
  ctaClicks: number;
  updatedAt: Date;
}

const AnalyticsSchema: Schema = new Schema<IAnalytics>(
  {
    date: { type: String, required: true, unique: true },
    pageViews: { type: Number, default: 0 },
    uniqueVisitors: { type: Number, default: 0 },
    ctaClicks: { type: Number, default: 0 },
  },
  { timestamps: true, strict: false }
);

if (mongoose.models && mongoose.models.Analytics) {
  delete (mongoose.models as any).Analytics;
}

const Analytics: Model<IAnalytics> = mongoose.model<IAnalytics>('Analytics', AnalyticsSchema);

export default Analytics;
