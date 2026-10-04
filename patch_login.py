import re

content = open('src/components/LoginModal.tsx', 'r').read()

# Fix subtitle
content = content.replace(
    "Isi pendaftaran singkat untuk reservasi tenda VIP & cicip katering.",
    "Buat akun NikaHub Anda untuk dapat memesan layanan dengan mudah."
)

# Remove the entire grid block for Rencana Tanggal & Estimasi Tamu
pattern = r'<div className="grid grid-cols-2 gap-3">.*?Rencana Tanggal.*?Estimasi Tamu.*?</div>\s*</div>'
content = re.sub(pattern, '', content, flags=re.DOTALL)

open('src/components/LoginModal.tsx', 'w').write(content)
