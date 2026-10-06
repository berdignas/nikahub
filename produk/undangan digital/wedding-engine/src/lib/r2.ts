import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const accountId = process.env.R2_ACCOUNT_ID || '';
const accessKeyId = process.env.R2_ACCESS_KEY_ID || '';
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY || '';
export const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || 'nikahhub-assets';
export const R2_PUBLIC_DOMAIN = process.env.R2_PUBLIC_DOMAIN || '';

export const isR2Configured = Boolean(accountId && accessKeyId && secretAccessKey);

export const r2Client = isR2Configured
  ? new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    })
  : null;

export async function uploadToR2(
  fileBuffer: Buffer,
  fileName: string,
  contentType: string
): Promise<string> {
  if (!r2Client) {
    throw new Error('Cloudflare R2 is not configured. Missing credentials.');
  }

  const cleanFileName = `assets/${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: cleanFileName,
    Body: fileBuffer,
    ContentType: contentType,
  });

  await r2Client.send(command);

  // Return public URL
  if (R2_PUBLIC_DOMAIN) {
    const domain = R2_PUBLIC_DOMAIN.endsWith('/')
      ? R2_PUBLIC_DOMAIN.slice(0, -1)
      : R2_PUBLIC_DOMAIN;
    return `${domain}/${cleanFileName}`;
  }

  return `https://${accountId}.r2.cloudflarestorage.com/${R2_BUCKET_NAME}/${cleanFileName}`;
}
