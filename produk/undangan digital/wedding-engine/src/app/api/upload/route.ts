import { NextResponse } from 'next/server';
import { uploadToR2, isR2Configured } from '@/lib/r2';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = file.name;
    const contentType = file.type || 'application/octet-stream';

    // 1. If Cloudflare R2 is configured, upload directly to R2
    if (isR2Configured) {
      const publicUrl = await uploadToR2(buffer, fileName, contentType);
      return NextResponse.json({
        success: true,
        url: publicUrl,
        name: fileName,
        storage: 'cloudflare-r2',
        size: buffer.length,
      });
    }

    // 2. Fallback: Save locally to /public/assets/user-uploads
    const uploadDir = path.join(process.cwd(), 'public', 'assets', 'user-uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const safeName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filePath = path.join(uploadDir, safeName);
    fs.writeFileSync(filePath, buffer);

    const localUrl = `/assets/user-uploads/${safeName}`;

    return NextResponse.json({
      success: true,
      url: localUrl,
      name: fileName,
      storage: 'local-server',
      size: buffer.length,
      note: 'R2 belum diatur di .env, file disimpan di server lokal.',
    });
  } catch (err: any) {
    console.error('Upload error:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to upload file' },
      { status: 500 }
    );
  }
}
