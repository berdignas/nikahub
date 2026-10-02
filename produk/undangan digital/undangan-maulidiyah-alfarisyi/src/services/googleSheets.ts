// Service to interact with Google Sheets for Guestbook / RSVP

export const GOOGLE_SHEET_ID = '17aLKD017SmH89gkco40pOInHXX0Je4pY95hPznySRTs';

// URL Google Apps Script Web App
export const GOOGLE_SCRIPT_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbwbvpGHbwCa4pCSzhAqlTfuHGFl-HybL4dgTlOKr1w8gQ3WxRaJNPldktYR0LZae9TW/exec';

export interface SheetWish {
  id: string;
  name: string;
  attendance: 'hadir' | 'tidak_hadir';
  guestsCount: string;
  message: string;
  date: string;
  likes: number;
  avatarColor: string;
}

const AVATAR_COLORS = [
  'bg-emerald-600',
  'bg-rose-500',
  'bg-amber-600',
  'bg-indigo-600',
  'bg-purple-600',
  'bg-teal-600',
  'bg-blue-600'
];

/**
 * Membaca data ucapan langsung dari Google Sheet via gviz endpoint
 */
export async function fetchWishesFromSheet(): Promise<SheetWish[]> {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?tqx=out:json`;
    const res = await fetch(url);
    if (!res.ok) return [];

    const text = await res.text();
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}');
    if (jsonStart === -1 || jsonEnd === -1) return [];

    const jsonStr = text.substring(jsonStart, jsonEnd + 1);
    const data = JSON.parse(jsonStr);
    const rows = data.table?.rows || [];

    const wishes: SheetWish[] = [];

    // Looping dari baris terakhir ke pertama agar ucapan terbaru ada di atas
    for (let i = rows.length - 1; i >= 0; i--) {
      const row = rows[i];
      if (!row || !row.c) continue;

      const dateVal = row.c[0]?.f ? String(row.c[0].f) : (row.c[0]?.v ? String(row.c[0].v) : 'Baru saja');
      const nameVal = row.c[1]?.v ? String(row.c[1].v) : '';
      const attendanceVal = row.c[2]?.v ? String(row.c[2].v).toLowerCase() : 'hadir';
      const guestsVal = row.c[3]?.v ? String(row.c[3].v) : '2 Orang';
      const messageVal = row.c[4]?.v ? String(row.c[4].v) : '';

      // Skip baris header jika ada
      if (nameVal.toLowerCase() === 'nama' || !nameVal.trim()) continue;

      const colorIndex = Math.abs(nameVal.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % AVATAR_COLORS.length;

      wishes.push({
        id: `sheet-${i}-${Date.now()}`,
        name: nameVal,
        attendance: attendanceVal.includes('tidak') ? 'tidak_hadir' : 'hadir',
        guestsCount: guestsVal,
        message: messageVal,
        date: dateVal,
        likes: Math.floor(Math.random() * 5) + 1,
        avatarColor: AVATAR_COLORS[colorIndex]
      });
    }

    return wishes;
  } catch (error) {
    console.error('Error fetching wishes from Google Sheets:', error);
    return [];
  }
}

/**
 * Mengirim data ucapan baru ke Google Apps Script Web App
 */
export async function submitWishToSheet(payload: {
  name: string;
  attendance: string;
  guestsCount: string;
  message: string;
  scriptUrl?: string;
}): Promise<boolean> {
  const targetUrl = payload.scriptUrl || GOOGLE_SCRIPT_WEBAPP_URL;

  try {
    // Kirim menggunakan form urlencoded atau body JSON dengan mode no-cors
    await fetch(targetUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        name: payload.name,
        attendance: payload.attendance === 'hadir' ? 'Hadir' : 'Tidak Hadir',
        guestsCount: payload.guestsCount,
        message: payload.message,
        timestamp: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })
      })
    });
    return true;
  } catch (error) {
    console.error('Error submitting wish to Google Sheets:', error);
    return false;
  }
}
