import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Setting from '@/models/Setting';

export async function GET() {
  try {
    const conn = await dbConnect();

    let setting: any = null;
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
        enableOrderBump: true,
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
      updatedAt: new Date(),
    };

    if (productDriveUrl !== undefined) updateFields.productDriveUrl = productDriveUrl;
    if (orderBumpDriveUrl !== undefined) updateFields.orderBumpDriveUrl = orderBumpDriveUrl;
    if (basePrice !== undefined && !isNaN(Number(basePrice))) updateFields.basePrice = Number(basePrice);
    if (bumpPrice !== undefined && !isNaN(Number(bumpPrice))) updateFields.bumpPrice = Number(bumpPrice);
    if (adminPin !== undefined && adminPin !== '') updateFields.adminPin = adminPin;
    if (metaPixelId !== undefined) updateFields.metaPixelId = metaPixelId;
    if (enableOrderBump !== undefined) updateFields.enableOrderBump = Boolean(enableOrderBump);

    let updatedSetting: any = null;

    if (conn) {
      // Direct Mongoose findOneAndUpdate with upsert
      updatedSetting = await Setting.findOneAndUpdate(
        {},
        { $set: updateFields },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      ).lean();
    } else {
      updatedSetting = updateFields;
    }

    return NextResponse.json({
      success: true,
      message: `Product Settings updated successfully! Order Bump: ${updateFields.enableOrderBump ? 'ON' : 'OFF'}`,
      setting: updatedSetting,
    });
  } catch (error: any) {
    console.error('Settings Update Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Error updating settings' },
      { status: 500 }
    );
  }
}
