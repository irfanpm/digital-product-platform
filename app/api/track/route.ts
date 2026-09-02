import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Analytics from '@/models/Analytics';

declare global {
  var globalAnalytics: {
    pageViews: number;
    uniqueVisitors: number;
    ctaClicks: number;
    daily: { [date: string]: { views: number; clicks: number } };
  };
}

if (!global.globalAnalytics) {
  global.globalAnalytics = {
    pageViews: 0,
    uniqueVisitors: 0,
    ctaClicks: 0,
    daily: {},
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const event = body.event || 'pageview'; // 'pageview' | 'cta_click'
    const today = new Date().toISOString().split('T')[0];

    // 1. Update in-memory tracker
    if (!global.globalAnalytics.daily[today]) {
      global.globalAnalytics.daily[today] = { views: 0, clicks: 0 };
    }

    if (event === 'pageview') {
      global.globalAnalytics.pageViews += 1;
      global.globalAnalytics.daily[today].views += 1;
    } else if (event === 'cta_click') {
      global.globalAnalytics.ctaClicks += 1;
      global.globalAnalytics.daily[today].clicks += 1;
    }

    // 2. Persist to MongoDB if connected
    try {
      const conn = await dbConnect();
      if (conn) {
        const updateField = event === 'pageview' ? { $inc: { pageViews: 1 } } : { $inc: { ctaClicks: 1 } };
        await Analytics.findOneAndUpdate(
          { date: today },
          updateField,
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
      }
    } catch (dbErr) {
      console.warn('Analytics DB update warning (in-memory analytics active):', dbErr);
    }

    return NextResponse.json({
      success: true,
      analytics: {
        pageViews: global.globalAnalytics.pageViews,
        ctaClicks: global.globalAnalytics.ctaClicks,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const conn = await dbConnect();
    let totalViews = global.globalAnalytics.pageViews;
    let totalClicks = global.globalAnalytics.ctaClicks;

    if (conn) {
      try {
        const allRecords = await Analytics.find({}).lean();
        if (allRecords && allRecords.length > 0) {
          const dbViews = allRecords.reduce((acc, r) => acc + (r.pageViews || 0), 0);
          const dbClicks = allRecords.reduce((acc, r) => acc + (r.ctaClicks || 0), 0);
          totalViews = Math.max(totalViews, dbViews);
          totalClicks = Math.max(totalClicks, dbClicks);
        }
      } catch (err) {
        console.warn('Analytics DB read warning:', err);
      }
    }

    return NextResponse.json({
      success: true,
      pageViews: totalViews,
      ctaClicks: totalClicks,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: true,
      pageViews: global.globalAnalytics.pageViews,
      ctaClicks: global.globalAnalytics.ctaClicks,
    });
  }
}
