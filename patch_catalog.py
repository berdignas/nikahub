import re

content = open('src/components/CatalogView.tsx', 'r').read()

old_search = '''      // Search query match
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        p.title.toLowerCase().includes(query) ||
        (p.talentName && p.talentName.toLowerCase().includes(query)) ||
        p.vendorName.toLowerCase().includes(query) ||
        p.tagline.toLowerCase().includes(query);'''

new_search = '''      // Search query match
      const query = searchQuery.toLowerCase();
      const matchesSearch = !query || [
        p.title,
        p.talentName,
        p.vendorName,
        p.tagline,
        p.description
      ].some(field => field && field.toLowerCase().includes(query));'''

content = content.replace(old_search, new_search)

open('src/components/CatalogView.tsx', 'w').write(content)
