import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Setting from '@/models/Setting';

export async function POST(req: Request) {
  try {
    const conn = await dbConnect();
    const body = await req.json();
    const { pin } = body;

    let validPin = 'admin123';
    
    if (conn) {
      try {
        const setting = await Setting.findOne({}).lean();
        if (setting && setting.adminPin) {
          validPin = setting.adminPin;
        }
      } catch (err) {
        console.warn('DB error during verify-pin', err);
      }
    } 
    
    if (!conn || !validPin) {
      if (global.globalMemorySettings && global.globalMemorySettings.adminPin) {
        validPin = global.globalMemorySettings.adminPin;
      }
    }

    if (pin === validPin) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: 'Invalid PIN' }, { status: 401 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
