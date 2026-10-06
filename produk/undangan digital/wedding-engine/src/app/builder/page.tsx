import React from 'react';
import { InvitationStudio } from '@/components/builder/InvitationStudio';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Studio Pembuat Undangan Digital | NikahHub Wedding Engine',
  description: 'Alat dan mesin pembuat undangan pernikahan digital dengan drag and drop elemen, custom font, warna, shape, upload aset, dan efek animasi.',
};

export default function BuilderPage() {
  return <InvitationStudio />;
}
