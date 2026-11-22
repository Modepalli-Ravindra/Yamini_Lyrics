import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';

    let slug = '';
    let buffer: Buffer;

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('image') as File | null;
      slug = (formData.get('slug') as string) || '';

      if (!file) {
        return NextResponse.json({ error: 'No image file uploaded' }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      buffer = Buffer.from(bytes);

      if (!slug) {
        const originalName = file.name || 'deity';
        slug = originalName.replace(/\.[^/.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
      }
    } else {
      // JSON body with base64
      const body = await req.json();
      slug = body.slug || '';
      const base64Data = body.base64 || '';

      if (!base64Data) {
        return NextResponse.json({ error: 'No base64 image data provided' }, { status: 400 });
      }

      // Remove data URL prefix if present
      const base64Clean = base64Data.replace(/^data:image\/\w+;base64,/, '');
      buffer = Buffer.from(base64Clean, 'base64');
    }

    const safeSlug = slug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || `deity-${Date.now()}`;

    // Ensure target directory exists
    const targetDir = path.join(process.cwd(), 'public', 'assets', 'deities');
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const fileName = `${safeSlug}.png`;
    const targetPath = path.join(targetDir, fileName);

    fs.writeFileSync(targetPath, buffer);

    const publicUrl = `/assets/deities/${fileName}`;

    return NextResponse.json({
      success: true,
      imageUrl: publicUrl,
      slug: safeSlug,
      message: 'Deity image uploaded successfully',
    });
  } catch (error: any) {
    console.error('Image upload error:', error);
    return NextResponse.json({ error: error.message || 'Image upload failed' }, { status: 500 });
  }
}
