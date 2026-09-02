import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Setting from '@/models/Setting';

declare global {
  var globalMemorySettings: any;
}

if (!global.globalMemorySettings) {
  global.globalMemorySettings = {
    productDriveUrl: 'https://drive.google.com/file/d/1_Sample_All_In_One_Digital_Planner_2026_2028/view',
    orderBumpDriveUrl: 'https://notion.so/Sample_Planner_Bonus_Pack',
    basePrice: 199,
    bumpPrice: 99,
    adminPin: 'admin123',
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || '123456789012345',
    enableOrderBump: false,
  };
}

export async function GET() {
  try {
    const conn = await dbConnect();

    let setting: any = null;
    if (conn) {
      setting = await Setting.findOne({}).lean();
    }

    if (!setting) {
      setting = global.globalMemorySettings;
    } else {
      global.globalMemorySettings = setting;
    }

    return NextResponse.json({
      success: true,
      setting,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: true,
      setting: global.globalMemorySettings,
    });
  }
}

export async function POST(req: Request) {
  try {
    const conn = await dbConnect();
    const body = await req.json();

    const {
      productDriveUrl,
      orderBumpDriveUrl,
      basePrice,
      bumpPrice,
      adminPin,
      metaPixelId,
      enableOrderBump,
    } = body;

    const updateFields: any = {
      ...global.globalMemorySettings,
      updatedAt: new Date(),
    };

    if (productDriveUrl !== undefined) updateFields.productDriveUrl = productDriveUrl;
    if (orderBumpDriveUrl !== undefined) updateFields.orderBumpDriveUrl = orderBumpDriveUrl;
    if (basePrice !== undefined && !isNaN(Number(basePrice))) updateFields.basePrice = Number(basePrice);
    if (bumpPrice !== undefined && !isNaN(Number(bumpPrice))) updateFields.bumpPrice = Number(bumpPrice);
    if (adminPin !== undefined && adminPin !== '') updateFields.adminPin = adminPin;
    if (metaPixelId !== undefined) updateFields.metaPixelId = metaPixelId;
    if (enableOrderBump !== undefined) updateFields.enableOrderBump = Boolean(enableOrderBump);

    // Update global in-memory settings store immediately
    global.globalMemorySettings = {
      ...global.globalMemorySettings,
      ...updateFields,
    };

    let updatedSetting: any = global.globalMemorySettings;

    if (conn) {
      try {
        updatedSetting = await Setting.findOneAndUpdate(
          {},
          { $set: updateFields },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        ).lean();
      } catch (err) {
        console.warn('MongoDB update warning, using in-memory store:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Digital Planner Settings saved successfully! Base price is ₹${updateFields.basePrice}`,
      setting: updatedSetting || global.globalMemorySettings,
    });
  } catch (error: any) {
    console.error('Settings Update Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Error updating settings' },
      { status: 500 }
    );
  }
}
