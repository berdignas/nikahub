import { GuestAlbum, PhotoMoment } from '../types';

export const R2_CONFIG = {
  publicUrl: (import.meta.env.VITE_R2_PUBLIC_URL || 'https://pub-05dae10551b54a49b1b92a3dedd919d6.r2.dev').replace(/\/$/, ''),
  bucketName: import.meta.env.VITE_R2_BUCKET_NAME || 'bdnstorage',
  accountId: import.meta.env.VITE_R2_ACCOUNT_ID || '3ef8535af55826b8c4eda431366988ae',
  accessKeyId: import.meta.env.VITE_R2_ACCESS_KEY_ID || 'b11257a112d8a90399fe56bc2a3ac5bf',
  secretAccessKey: import.meta.env.VITE_R2_SECRET_ACCESS_KEY || '32d542f3911c9bd1fdb44a519fcdff6e65a1fe86fdb01fd654ca7c12f9ab6a66',
  endpoint: import.meta.env.VITE_R2_ENDPOINT || 'https://3ef8535af55826b8c4eda431366988ae.r2.cloudflarestorage.com',
};

// Helper function to build Cloudflare R2 Photo URL
export function buildR2PhotoUrl(fileName: string): string {
  return `${R2_CONFIG.publicUrl}/events/maulidiyah-alfarisyi/${fileName}`;
}

/**
 * Native Web Crypto API SHA-256 Digest Helper
 */
async function sha256Hex(buffer: Uint8Array | ArrayBuffer): Promise<string> {
  const hashBuf = await crypto.subtle.digest('SHA-256', buffer as unknown as BufferSource);
  return Array.from(new Uint8Array(hashBuf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Native Web Crypto API HMAC-SHA256 Helper
 */
async function hmacSha256(key: Uint8Array | string, str: string): Promise<Uint8Array> {
  const enc = new TextEncoder();
  const keyObj =
    typeof key === 'string' || key instanceof Uint8Array
      ? await crypto.subtle.importKey(
          'raw',
          (typeof key === 'string' ? enc.encode(key) : key) as unknown as BufferSource,
          { name: 'HMAC', hash: 'SHA-256' },
          false,
          ['sign']
        )
      : key;
  return new Uint8Array(
    await crypto.subtle.sign('HMAC', keyObj as CryptoKey, enc.encode(str) as unknown as BufferSource)
  );
}

/**
 * Direct Browser S3 SigV4 PUT to Cloudflare R2
 */
async function uploadDirectSigV4(
  bodyBytes: Uint8Array,
  key: string,
  contentType: string
): Promise<string> {
  const host = `${R2_CONFIG.accountId}.r2.cloudflarestorage.com`;
  const region = 'auto';
  const service = 's3';

  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
  const dateStamp = amzDate.slice(0, 8);

  const payloadHash = await sha256Hex(bodyBytes);
  const canonicalUri = `/${R2_CONFIG.bucketName}/${key}`;
  const canonicalHeaders = `host:${host}\nx-amz-content-sha256:${payloadHash}\nx-amz-date:${amzDate}\n`;
  const signedHeaders = 'host;x-amz-content-sha256;x-amz-date';

  const canonicalRequest = [
    'PUT',
    canonicalUri,
    '',
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join('\n');

  const canonicalHash = await sha256Hex(new TextEncoder().encode(canonicalRequest));
  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
  const stringToSign = [
    'AWS4-HMAC-SHA256',
    amzDate,
    credentialScope,
    canonicalHash,
  ].join('\n');

  const kDate = await hmacSha256('AWS4' + R2_CONFIG.secretAccessKey, dateStamp);
  const kRegion = await hmacSha256(kDate, region);
  const kService = await hmacSha256(kRegion, service);
  const kSigning = await hmacSha256(kService, 'aws4_request');
  const signatureBytes = await hmacSha256(kSigning, stringToSign);
  const signature = Array.from(signatureBytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  const authHeader = `AWS4-HMAC-SHA256 Credential=${R2_CONFIG.accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const putUrl = `https://${host}${canonicalUri}`;

  const response = await fetch(putUrl, {
    method: 'PUT',
    headers: {
      'Host': host,
      'x-amz-date': amzDate,
      'x-amz-content-sha256': payloadHash,
      'Authorization': authHeader,
      'Content-Type': contentType,
    },
    body: new Blob([bodyBytes as any], { type: contentType }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new Error(`Direct R2 upload failed with status ${response.status}: ${errorText}`);
  }

  return `${R2_CONFIG.publicUrl}/${key}`;
}

/**
 * Fallback to Express backend proxy (/api/upload-r2)
 */
async function uploadViaBackendProxy(
  base64Data: string,
  filename: string,
  folder: string,
  contentType: string
): Promise<string> {
  const endpoints = [
    '/api/upload-r2',
    'https://nikahub.my.id/api/upload-r2',
    'http://localhost:3000/api/upload-r2',
    'http://localhost:5000/api/upload-r2',
  ];

  let lastError: any = null;
  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          base64: base64Data,
          filename,
          folder,
          contentType,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.url) {
          return json.url;
        }
      }
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error('Backend proxy upload failed');
}

/**
 * Resilient Single File Base64 to Cloudflare R2 Uploader
 */
export async function uploadBase64ToR2(
  base64Data: string,
  filename: string,
  folder: string = 'events/maulidiyah-alfarisyi'
): Promise<string> {
  // If already an HTTP/HTTPS remote URL, skip upload
  if (!base64Data || base64Data.startsWith('http://') || base64Data.startsWith('https://')) {
    return base64Data;
  }

  // Parse MIME type & raw base64 data
  let detectedType = 'image/jpeg';
  let rawBase64 = base64Data;
  const commaIdx = base64Data.indexOf(',');
  if (commaIdx !== -1) {
    const meta = base64Data.slice(0, commaIdx);
    rawBase64 = base64Data.slice(commaIdx + 1);
    const mimeMatch = meta.match(/data:([^;]+)/);
    if (mimeMatch && mimeMatch[1]) {
      detectedType = mimeMatch[1];
    }
  }

  const key = `${folder.replace(/\/$/, '')}/${filename}`;

  // 1. Try Direct Web Crypto SigV4 PUT
  try {
    const binaryString = atob(rawBase64);
    const len = binaryString.length;
    const bodyBytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bodyBytes[i] = binaryString.charCodeAt(i);
    }

    const publicUrl = await uploadDirectSigV4(bodyBytes, key, detectedType);
    console.log('✅ Direct R2 Upload Succeeded:', publicUrl);
    return publicUrl;
  } catch (directErr) {
    console.warn('Direct R2 PUT failed (likely CORS preflight or network), falling back to backend proxy:', directErr);
  }

  // 2. Try Backend Server Proxy Upload
  try {
    const publicUrl = await uploadViaBackendProxy(base64Data, filename, folder, detectedType);
    console.log('✅ Server Proxy R2 Upload Succeeded:', publicUrl);
    return publicUrl;
  } catch (proxyErr) {
    console.warn('Backend proxy R2 upload failed:', proxyErr);
  }

  // 3. Fallback: Return original base64 as extreme safety net so data is never lost
  console.warn('⚠️ All R2 upload methods exhausted. Preserving Base64 data for safe database fallback.');
  return base64Data;
}

/**
 * Resilient Album Asset Uploader
 * Uploads all album photos and voice notes to Cloudflare R2 before database synchronization
 */
export async function uploadAlbumAssetsToR2(
  album: GuestAlbum,
  onProgress?: (message: string) => void
): Promise<GuestAlbum> {
  const updatedPhotos: PhotoMoment[] = [];

  // Upload Photos to R2
  for (let i = 0; i < album.photos.length; i++) {
    const photo = album.photos[i];
    if (photo.imageUrl && photo.imageUrl.startsWith('data:image/')) {
      if (onProgress) {
        onProgress(`Mengunggah foto ${i + 1} dari ${album.photos.length} ke Cloudflare R2...`);
      }

      const ext = photo.imageUrl.includes('png') ? 'png' : photo.imageUrl.includes('webp') ? 'webp' : 'jpg';
      const filename = `photo_${Date.now()}_${i}_${Math.random().toString(36).substring(2, 7)}.${ext}`;
      const r2Url = await uploadBase64ToR2(photo.imageUrl, filename);

      updatedPhotos.push({
        ...photo,
        imageUrl: r2Url,
      });
    } else {
      updatedPhotos.push(photo);
    }
  }

  // Upload Voice Note to R2 if present
  let updatedVoiceNoteUrl = album.voiceNoteUrl;
  if (album.voiceNoteUrl && album.voiceNoteUrl.startsWith('data:audio/')) {
    if (onProgress) {
      onProgress('Mengunggah rekaman doa restu ke Cloudflare R2...');
    }

    const ext = album.voiceNoteUrl.includes('mp4') ? 'mp4' : album.voiceNoteUrl.includes('aac') ? 'aac' : 'webm';
    const filename = `vn_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;
    updatedVoiceNoteUrl = await uploadBase64ToR2(album.voiceNoteUrl, filename);
  }

  return {
    ...album,
    photos: updatedPhotos,
    voiceNoteUrl: updatedVoiceNoteUrl,
  };
}
