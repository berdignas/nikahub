import { PhotoMoment } from '../types';

export const R2_CONFIG = {
  publicUrl: import.meta.env.VITE_R2_PUBLIC_URL || 'https://pub-05dae10551b54a49b1b92a3dedd919d6.r2.dev',
  bucketName: import.meta.env.VITE_R2_BUCKET_NAME || 'bdnstorage',
  accountId: import.meta.env.VITE_R2_ACCOUNT_ID || '3ef8535af55826b8c4eda431366988ae',
};

// Helper function to build Cloudflare R2 Photo URL
export function buildR2PhotoUrl(fileName: string): string {
  const baseUrl = R2_CONFIG.publicUrl.replace(/\/$/, '');
  return `${baseUrl}/events/maulidiyah-alfarisyi/${fileName}`;
}
