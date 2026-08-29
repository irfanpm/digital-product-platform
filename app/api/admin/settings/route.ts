import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Setting from '@/models/Setting';

export async function GET() {
  try {
    const conn = await dbConnect();

    let setting = null;
    if (conn) {
      setting = await Setting.findOne({}).lean();
    }

    if (!setting) {
      setting = {
        productDriveUrl: 'https://drive.google.com/file/d/1_Sample_AI_Job_Application_Kit_38Page/view',
        orderBumpDriveUrl: 'https://notion.so/Sample_10_Word_Templates_And_Job_Tracker_Dashboard',
        basePrice: 299,
        bumpPrice: 99,
        adminPin: 'admin123',
        metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || '123456789012345',
      };
    }

    return NextResponse.json({
      success: true,
      setting,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Error fetching settings' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const conn = await dbConnect();
    const body = await req.json();

    const { productDriveUrl, orderBumpDriveUrl, basePrice, bumpPrice, adminPin, metaPixelId } = body;

    let updatedSetting = null;

    if (conn) {
      updatedSetting = await Setting.findOneAndUpdate(
        {},
        {
          productDriveUrl: productDriveUrl || 'https://drive.google.com/file/d/1_Sample_AI_Job_Application_Kit_38Page/view',
          orderBumpDriveUrl: orderBumpDriveUrl || 'https://notion.so/Sample_10_Word_Templates_And_Job_Tracker_Dashboard',
          basePrice: typeof basePrice === 'number' ? basePrice : 299,
          bumpPrice: typeof bumpPrice === 'number' ? bumpPrice : 99,
          adminPin: adminPin || 'admin123',
          metaPixelId: metaPixelId || '123456789012345',
        },
        { upsert: true, new: true }
      );
    } else {
      updatedSetting = {
        productDriveUrl,
        orderBumpDriveUrl,
        basePrice,
        bumpPrice,
        adminPin,
        metaPixelId,
      };
    }

    return NextResponse.json({
      success: true,
      message: 'Product Settings & Meta Pixel ID updated successfully!',
      setting: updatedSetting,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Error updating settings' },
      { status: 500 }
    );
  }
}
