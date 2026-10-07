# BrewAroma — Landing Page UMKM

Landing page statis untuk UMKM kopi craft & snack artisan. Pengunjung lihat produk, klik kartu untuk detail, lalu pesan via WhatsApp. Dibangun dengan HTML + CSS + JavaScript polos dan Tailwind CSS.

Live: https://brewaroma.vercel.app/

## Menjalankan lokal

Butuh server HTTP lokal (buka `index.html` langsung via `file://` membuat fetch/JS tidak jalan normal).

```bash
cd "Landing Page UMKM"
python -m http.server 8132
# buka http://127.0.0.1:8132/index.html
```

Alternatif:

```bash
npx serve .
```

## Build CSS (Tailwind)

Sumber: `css/input.css`. Hasil: `css/tailwind.css`.

```bash
npm install
npm run build:css
```

Setiap tambah class Tailwind baru di HTML, jalankan ulang perintah di atas dan commit `css/tailwind.css` terpisah dari commit HTML.

## Build file .min (JavaScript)

`index.html` memuat versi `.min`, bukan sumber:

- `js/products.min.js` dari `js/products.js`
- `js/main.min.js` dari `js/main.js`

Setelah edit sumber, build ulang:

```bash
npx terser js/main.js -o js/main.min.js -c -m
npx terser js/products.js -o js/products.min.js -c -m
```

## Mengganti data produk dan testimoni

Edit `js/products.js`:

- Array `products`: `id`, `nama`, `harga` (angka rupiah), `gambar` (URL), `deskripsi`, `rating`, `jumlahReview`.
- Array `testimonials`: `nama`, `avatar`, `komentar`, `rating`.

Lalu build ulang `js/products.min.js` (perintah di atas) dan cek di serve lokal: grid tampil, modal buka/tutup, rating ringkasan benar.

## Nomor WhatsApp

Nomor ada di tiga tempat dan ketiganya harus diubah bersamaan:

1. `config.js` (`WHATSAPP_NUMBER`) — sumber utama untuk semua link yang dibuat JS, termasuk pesan per produk di modal.
2. `index.html` — atribut `href` fallback `wa.me/...` di tombol navbar, hero, contact, dan modal (agar tetap bisa diklik walau JS mati).
3. `index.html` — field `telephone` di JSON-LD `LocalBusiness` (format internasional pakai `+`).

Jangan tulis nomor asli di laporan/commit message. Cukup sebut file dan barisnya.

## Struktur folder

```
index.html          # halaman utama + SEO head + JSON-LD
config.js           # nomor WA, nama brand, tagline
js/products.js      # data produk & testimoni (sumber)
js/products.min.js  # data produk & testimoni (dipakai index.html)
js/main.js          # render, modal, rating (sumber)
js/main.min.js      # logika (dipakai index.html)
css/input.css       # sumber Tailwind
css/tailwind.css    # hasil build Tailwind
css/style.css       # gaya kustom (tombol WA, kartu, modal)
assets/images/      # gambar milik sendiri (masih kosong)
robots.txt          # Sitemap absolut
sitemap.xml         # halaman utama saja
AUDIT-REPORT.md     # laporan audit
```

## Skor Lighthouse (hasil ukur, 2026-10-07)

Diukur lokal via serve `python -m http.server`, Chrome headless. Detail di `AUDIT-REPORT.md` bagian 7.

| Mode | Performance | Accessibility | Best Practices | SEO |
|------|-------------|---------------|----------------|-----|
| Mobile | 99 | 93 | 100 | 100 |
| Desktop | 100 | 93 | 100 | 100 |

Catatan: skor SEO 100 dari Lighthouse tidak berarti SEO selesai — konten produk/testimoni masih render via JS dan `og:image` masih pending (lihat To-do).

## To-do

- `og-image.jpg` 1200x630: taruh di `assets/images/`, lalu tambahkan `og:image` dan `twitter:image` di `index.html` dan ganti `twitter:card` ke `summary_large_image`.
- Foto produk masih dari Unsplash — ganti bertahap dengan foto asli.
