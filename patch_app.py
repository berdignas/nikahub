import re

content = open('src/App.tsx', 'r', encoding='utf-8').read()

old_block = '''              const stored = localStorage.getItem('nikahub_products_data');
              if (stored) {
                const localProds = JSON.parse(stored);
                if (localProds.length > 0) {
                  setProducts(localProds);
                  syncLocalProductsToSupabase().then(() => {
                    fetchProductsFromSupabase().then(res => {
                      if (isMounted && res.length > 0) setProducts(res);
                    });
                  });
                }
              }'''

new_block = '''              const stored = localStorage.getItem('nikahub_products_data');
              let foundLocal = false;
              if (stored) {
                const localProds = JSON.parse(stored);
                if (localProds.length > 0) {
                  setProducts(localProds);
                  foundLocal = true;
                  syncLocalProductsToSupabase().then(() => {
                    fetchProductsFromSupabase().then(res => {
                      if (isMounted && res.length > 0) setProducts(res);
                    });
                  });
                }
              }
              
              // Failsafe: Jika DB kosong & Local kosong, munculkan dummy agar tidak blank (0 Layanan)
              if (!foundLocal) {
                setProducts(WEDDING_PRODUCTS);
              }'''

content = content.replace(old_block, new_block)

open('src/App.tsx', 'w', encoding='utf-8').write(content)
