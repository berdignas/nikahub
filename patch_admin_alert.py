import re

content = open('src/App.tsx', 'r', encoding='utf-8').read()

old_block = '''  const handleAddProduct = async (newProd: WeddingProduct) => {
    const updated = [newProd, ...products];
    saveProductsToStorage(updated);
    try {
      await saveProductToSupabase(newProd);
    } catch (e) {
      console.error('Failed to sync added product to Supabase:', e);
    }
  };'''

new_block = '''  const handleAddProduct = async (newProd: WeddingProduct) => {
    const updated = [newProd, ...products];
    saveProductsToStorage(updated);
    try {
      const res = await saveProductToSupabase(newProd);
      if (res && !res.success) {
        console.error('DB Sync Error:', res.error);
        alert('Produk tersimpan di lokal, tapi gagal dikirim ke database Supabase.\\nKemungkinan: Skema SQL belum dijalankan di Supabase atau RLS memblokir.\\nError: ' + res.error);
      }
    } catch (e) {
      console.error('Failed to sync added product to Supabase:', e);
    }
  };'''

content = content.replace(old_block, new_block)

open('src/App.tsx', 'w', encoding='utf-8').write(content)
