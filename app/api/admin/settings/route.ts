import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Setting from '@/models/Setting';

declare global {
  var globalMemorySettings: any;
}

if (!global.globalMemorySettings) {
  global.globalMemorySettings = {
    productDriveUrl: 'https://drive.google.com/file/d/1_Sample_AI_Job_Application_Kit_38Page/view',
    orderBumpDriveUrl: 'https://notion.so/Sample_10_Word_Templates_And_Job_Tracker_Dashboard',
    basePrice: 299,
    bumpPrice: 99,
    adminPin: 'admin123',
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || '123456789012345',
    enableOrderBump: true,
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
      if (typeof setting.enableOrderBump !== 'boolean') {
        setting.enableOrderBump = true;
      }
      global.globalMemorySettings = setting;
    }

    const publicSetting = { ...setting };
    delete publicSetting.adminPin;

    return NextResponse.json({
      success: true,
      setting: publicSetting,
    });
  } catch (error: any) {
    const publicSetting = { ...global.globalMemorySettings };
    delete publicSetting.adminPin;
    return NextResponse.json({
      success: true,
      setting: publicSetting,
    });
  }
}

export async function POST(req: Request) {
  try {
    const conn = await dbConnect();
    
    // Auth Check
    const authHeader = req.headers.get('authorization');
    const providedPin = authHeader?.split(' ')[1];
    
    let currentValidPin = 'admin123';
    if (conn) {
      const existingSetting = await Setting.findOne({}).lean();
      if (existingSetting?.adminPin) currentValidPin = existingSetting.adminPin;
    } else if (global.globalMemorySettings?.adminPin) {
      currentValidPin = global.globalMemorySettings.adminPin;
    }
    
    if (providedPin !== currentValidPin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

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

    const publicSetting = { ...updatedSetting };
    delete publicSetting.adminPin;

    return NextResponse.json({
      success: true,
      message: `Product Settings saved! Order Bump: ${global.globalMemorySettings.enableOrderBump ? 'ON' : 'OFF'}`,
      setting: publicSetting,
    });
  } catch (error: any) {
    console.error('Settings Update Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Error updating settings' },
      { status: 500 }
    );
  }
}
