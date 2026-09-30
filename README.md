# BrewAroma — Landing Page UMKM

Landing page modern untuk UMKM kopi craft & snack artisan. Dibangun dengan vanilla HTML/CSS/JS + Tailwind CSS v4.

## ✨ Fitur
- **Hero & CTA WhatsApp** — Primary conversion funnel
- **Produk Grid (8 items)** — Responsive, lazy-loaded, LCP-optimized
- **Modal Detail Produk** — Accessible (focus trap, keyboard nav, ARIA)
- **Testimoni & Rating** — Social proof dengan summary
- **About Us** — Brand story + value proposition
- **Contact** — Jam operasional + area layanan
- **WhatsApp Integration** — Pesan pre-filled untuk tiap produk

## 🚀 Performance (Lighthouse)
| Metric | Score |
|--------|-------|
| Performance | 95 |
| Accessibility | 96 |
| Best Practices | 100 |
| SEO | 100 |

**Optimasi:**
- Tailwind CDN → local build (-165KB render-blocking)
- JS minified via terser (-37% main.js)
- Images: WebP + q=75 via Unsplash params
- Preconnect + preload LCP image
- Lazy loading non-critical images

## 📁 Struktur
```
├── index.html
├── config.js           # WhatsApp number, brand config
├── package.json        # Build scripts
├── css/
│   ├── input.css       # Tailwind v4 entry + custom theme
│   ├── tailwind.css    # Compiled & minified (~30KB)
│   └── style.css       # Custom styles
├── js/
│   ├── products.js     # Product & testimoni data (source)
│   ├── products.min.js # Production
│   ├── main.js         # Logic (source)
│   └── main.min.js     # Production
└── DOCUMENTATION.md    # Full docs for submission
```

## 🛠 Setup & Build

```bash
# Install deps
npm install

# Build CSS (Tailwind v4)
npm run build:css

# Minify JS (jika ubah source)
npx terser js/main.js -o js/main.min.js -c -m
npx terser js/products.js -o js/products.min.js -c -m

# Serve locally
npx serve .
# atau
python -m http.server 8080
```

## 📦 Deploy
- **GitHub Pages:** Push ke repo → Settings → Pages → Source: main branch
- **Netlify/Vercel:** Import repo → auto-detect static site

## 📝 Submission Checklist
- [x] Landing page functional
- [x] Content & images match theme
- [x] Lighthouse scores ≥ 90 all categories
- [x] Accessibility audits pass
- [x] Documentation complete (DOCUMENTATION.md)
- [ ] Upload to GitHub
- [ ] Screenshots to Google Docs
- [ ] Submit links to Google Classroom

## 🔧 Config
Edit `config.js`:
```js
const WHATSAPP_NUMBER = "6288901419668";  // Format: 628xxxxxxxxx
const BRAND_NAME = "BrewAroma";
const BRAND_TAGLINE = "Kopi craft & snack artisan, direka jauh dan pas. Pesan mudah via WhatsApp — kami akan siapkan dengan tepat dan ketelitian.";
```

---

**Stack:** Vanilla JS, Tailwind CSS v4, terser, Unsplash Images