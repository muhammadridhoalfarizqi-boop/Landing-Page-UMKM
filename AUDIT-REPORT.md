# AUDIT-REPORT BrewAroma

Tanggal: 2026-10-07 · Auditor: QA engineer + web consultant · Kode tidak diubah.
Sumber: `index.html`, `js/main.js`, `js/products.js`, `config.js`, `css/`, `package.json`, `README.md`, `lighthouse-report.json`, fetch live `https://brewaroma.vercel.app/`.

## 1. Ringkasan eksekutif

Landing page statis rapi, funnel WA jelas, modal aksesibel dasar ada. Tapi konten produk/testimoni JS-only (SEO buta), tanpa OG/canonical/robots/sitemap, ada XSS `innerHTML`, rating rata-rata salah hitung, tombol tutup 36px, skor Lighthouse di README tak terbukti (`lighthouse-report.json` gagal run). Live fetch: grid produk/testimoni kosong, semua CTA WA `href="#"`.
Skor keseluruhan: **68/100** (estimasi statis; skor Lighthouse asli menyusul di bagian 7). Fungsional 75, Responsif 80, Performa 65, SEO 55, Aksesibilitas 70, Keamanan 60, UX/Konten 70.

## 2. Tabel temuan

| ID | Kategori | Severity | Temuan | Bukti (file:baris / langkah) | Rekomendasi perbaikan |
|----|----------|----------|--------|-------------------------------|------------------------|
| F1 | Fungsional | High | Link WA `href="#"` mati total jika JS gagal/lambat; semua CTA bergantung `applyWaLinks` | `index.html:28,39,114,143`; `js/main.js:8-13` | Isi `href` awal dengan URL `wa.me` final, JS hanya override. Catatan: nomor WA kini ada di dua tempat — `config.js:1` (sumber JS) dan href fallback `index.html:28,39,114,143`. README harus menyebut keduanya saat ganti nomor. |
| F2 | Fungsional | High | Render produk/testimoni via string `innerHTML` tanpa sanitasi; payload `p.nama`/`komentar` bisa injeksi HTML | `js/main.js:35,38-43,96-106` | Bangun DOM via `textContent`/`createElement`, escape kutip di atribut. |
| F3 | Fungsional | High | Rata-rata rating salah: mean dari rating, bukan rata-rata berbobot review; label "total+ review" menyesatkan | `js/main.js:64-71,78,85` | `avg = sum(rating*jumlahReview)/sum(jumlahReview)`. |
| F4 | Fungsional | Medium | `savedScrollY` disimpan tapi tak dipakai; `aria-hidden` + `display:none` ganda di modal | `js/main.js:134,149-150,159` | Hapus `savedScrollY` atau restore di close; tambah `inert` pada latar saat modal buka. |
| F5 | Fungsional | Medium | Kartu pakai `role="button"` + tombol "Lihat Detail" di dalam: nested interactive, screen reader bingung | `js/main.js:38,44` | Kartu jadi `article` + tombol saja yang klik; atau satu link dengan nama aksesibel. |
| R1 | Responsif | Medium | Tombol tutup modal 36px (`w-9 h-9`), di bawah target sentuh 44px | `index.html:136`; `css/style.css:48-52` | Naikkan ke min 44px. |
| R2 | Responsif | Low | Nav mobile tanpa menu hamburger; link Best/About/Testimoni/Contact hilang di <md | `index.html:22-27` | Tambah menu mobile sederhana. |
| P1 | Performa | High | Font dimuat via `@import` di `<style>`: render-blocking, FOUT/FOIT | `index.html:13-15` | `link preconnect + stylesheet` font dengan `display=swap`. |
| P2 | Performa | High | Gambar tanpa `width/height`, tanpa `srcset/sizes`; risiko CLS; CDN eksternal tanpa fallback | `js/main.js:39`; `js/products.js:6`; `index.html:9-10` | Tambah dimensi + `srcset`, self-host gambar hero, fallback `onerror`. |
| P3 | Performa | Medium | Semua gambar Unsplash `w=600` untuk semua viewport; avatar `pravatar.cc` pihak ketiga | `js/products.js:6,79` | Varian ukuran per breakpoint; self-host avatar. |
| P4 | Performa | Medium | Klaim Lighthouse README (95/96/100/100) tak terbukti; file laporan gagal run | `README.md:14-20`; `lighthouse-report.json:9-13` (`CHROME_INTERSTITIAL_ERROR`) | Run ulang Lighthouse mobile+desktop, simpan terpisah, perbarui README. |
| S1 | SEO | Critical | Tanpa `canonical`, OG, Twitter Card; preview WA/IG polos | `index.html:1-16`; grep kosong `og:\|twitter:\|canonical` | Tambah meta canonical + OG + Twitter Card + `theme-color`. |
| S2 | SEO | Critical | Produk/testimoni murni JS: crawler tanpa JS lihat grid kosong | `index.html:48,100-101`; fetch live grid kosong | Prerender/SSR atau `noscript` + daftar produk statis. |
| S3 | SEO | High | Tanpa `robots.txt`, `sitemap.xml`, JSON-LD `LocalBusiness/Product` | glob kosong `vercel.json/robots/sitemap`; grep kosong `ld+json` | Tambah `robots.txt`, `sitemap.xml`, JSON-LD. |
| S4 | SEO | Low | Satu H1 OK, tapi `title`/deskripsi generik, tanpa kata lokasi di title | `index.html:6-7,36` | Title "… Bandung & Cimahi", deskripsi + area layanan. |
| A1 | Aksesibilitas | Medium | Bintang `aria-hidden` tanpa label teks alternatif untuk SR | `js/main.js:16-23` | Bungkus dengan `role="img" aria-label="4.9 dari 5"`. |
| A2 | Aksesibilitas | Medium | Fokus modal selalu ke tombol tutup; judul tak diumumkan | `js/main.js:153` | Fokus ke judul (`tabindex="-1"`) atau region modal. |
| A3 | Aksesibilitas | Low | Kontras `text-stone-500` di atas terang tipis untuk teks kecil | `index.html:47,99`; `js/main.js:81` | Gelapkan ke `stone-600` untuk teks kecil. |
| K1 | Keamanan | Medium | Nomor WA + brand di `config.js` ikut commit; `.gitignore` tak lindungi | `config.js:1`; `.gitignore:1-27` | Terima sebagai publik (WA memang publik); jangan taruh secret di `config.js`. |
| K2 | Keamanan | Medium | Tanpa `vercel.json` headers (CSP, X-Content-Type-Options, dsb.) | glob kosong `vercel.json` | Tambah headers dasar via `vercel.json`. |
| K3 | Keamanan | Low | `target="_blank"` WA di-JS sudah `rel="noopener"` OK, tapi link statis IG tanpa `rel` | `js/main.js:12,147`; `index.html:125` | Tambah `rel="noopener"` di link IG. |
| U1 | UX/Konten | Medium | Tanpa varian/ukuran, stok/pre-order, ongkir, peta/alamat, FAQ, kebijakan retur | `js/products.js:1-74`; `index.html:109-112` | Tambah info cara pesan 1-2-3 + ongkir + area + FAQ. |
| U2 | UX/Konten | Medium | Testimoni terkesan generik: avatar `pravatar.cc`, tanpa tanggal/transaksi | `js/products.js:76-101` | Foto asli/tanggal, atau label "ulasan pelanggan". |
| U3 | UX/Konten | Medium | Link Instagram beda: lokal `brewaromaa` vs live fetch `haoyu.jpg` — perlu cek | `index.html:125` vs fetch live | Pastikan handle benar, samakan. |
| U4 | UX/Konten | Low | Copy campur: "direka", "Craft", "Artisan"; typo tagline `config.js` ("direka jauh dan pas") | `config.js:3`; `README.md:84` | Selaraskan ke BI santai + perbaiki tagline. |
| D1 | Repo | Low | `package.json` nama `opencode`, skrip `test` gagal, terser tak di deps; `assets/images/` kosong | `package.json:2,7`; `assets/images/` kosong | Betulkan nama/skrip, tambah terser ke devDeps, hapus folder mati. |

## 3. Quick wins (< 30 menit, dampak besar)

1. Isi semua CTA WA dengan `href` final (F1) — situs tetap order walau JS mati.
2. Tambah OG/canonical/Twitter/`theme-color` (S1) — preview WA/IG langsung bagus.
3. Tambah `robots.txt` + `sitemap.xml` (S3) — SEO dasar 10 menit.
4. Tombol tutup modal 44px + `rel="noopener"` IG (R1, K3).
5. `width/height` gambar + font via `link` (P1, P2) — CLS + FOUT turun.
6. Betulkan handle Instagram + tagline (U3, U4).
7. Betulkan `package.json` nama/skrip (D1).

## 4. Rekomendasi fitur baru

| Fitur | Manfaat bisnis | Impact (1-5) | Effort (1-5) | Prioritas |
|-------|---------------|--------------|--------------|-----------|
| Keranjang sederhana → pesan WA berisi rincian | Naikkan nilai order, kurangi tanya-jawab | 5 | 3 | P1 |
| Filter/kategori (kopi, snack, paket) | Temu produk cepat di HP | 4 | 2 | P1 |
| FAQ + cara pesan 1-2-3 + info ongkir | Turunkan keraguan, naikkan konversi | 4 | 1 | P1 |
| Floating WA + pesan per produk | CTA selalu terlihat | 4 | 1 | P1 |
| Google Maps + status buka/tutup | Datangkan pembeli lokal | 3 | 2 | P2 |
| Analytics klik WA (Vercel/GA4) | Tahu produk paling laku | 3 | 1 | P2 |
| Data produk JSON terpisah | Pemilik edit tanpa sentuh kode | 3 | 2 | P2 |
| Skeleton loading grid | Persepsi cepat saat JS lambat | 2 | 2 | Nanti |
| PWA / Add to Home Screen | Akses ulang cepat | 2 | 4 | Nanti |
| Galeri/video proses | Kepercayaan brand | 2 | 3 | Nanti |
| Dark mode | Kenyamanan malam | 1 | 3 | Nanti |
| Multi-bahasa ID/EN | Jangkauan turis (kecil di Bandung/Cimahi) | 1 | 4 | Nanti |

## 5. Roadmap

Minggu 1 (wajib): F1 WA fallback, F2 sanitasi, F3 rating berbobot, S1 OG/canonical, S3 robots/sitemap/JSON-LD, R1 tombol 44px, U3 Instagram benar. Tanpa ini: order gagal saat JS mati, SEO buta, hitung rating salah.
Minggu 2-3 (penting): keranjang WA, filter kategori, FAQ + ongkir, Maps + jam buka, analytics klik WA, JSON produk, P1-P3 performa gambar/font.
Nanti (nice-to-have): skeleton, PWA, galeri/video, dark mode, multi-bahasa.

## 6. Contoh patch (belum diterapkan)

```diff
--- a/index.html
+++ b/index.html
@@
-      <a href="#" data-wa-message="Halo, saya ingin pesan produk dari BrewAroma." class="wa-btn wa-btn-lg">Chat Sekarang via WhatsApp</a>
+      <a href="https://wa.me/6288901419668?text=Halo%2C%20saya%20ingin%20pesan%20produk%20dari%20BrewAroma." data-wa-message="Halo, saya ingin pesan produk dari BrewAroma." class="wa-btn wa-btn-lg">Chat Sekarang via WhatsApp</a>
```

```diff
--- a/js/main.js
+++ b/js/main.js
@@ renderProducts
-      var cardLabel = p.nama + ', ' + formatPrice(p.harga) + ', rating ' + p.rating + ' dari ' + p.jumlahReview + ' ulasan';
+      var cardLabel = String(p.nama) + ', ' + formatPrice(p.harga) + ', rating ' + p.rating + ' dari ' + p.jumlahReview + ' ulasan';
 // ponytail: ganti bangun string innerHTML dengan createElement + textContent; upgrade ke DOMPurify bila data dari CMS.
```

```diff
--- a/js/main.js
+++ b/js/main.js
@@ renderRatingSummary
-    var total = 0, sum = 0, count = 0;
-    products.forEach(function (p) {
-      sum += p.rating;
-      total += p.jumlahReview;
-      count++;
-    });
-    var avg = sum / count;
+    var total = 0, wsum = 0;
+    products.forEach(function (p) {
+      wsum += p.rating * p.jumlahReview;
+      total += p.jumlahReview;
+    });
+    var avg = total ? wsum / total : 0;
```

```diff
--- a/index.html (head)
+++ b/index.html (head)
@@
+  <link rel="canonical" href="https://brewaroma.vercel.app/" />
+  <meta property="og:type" content="website" />
+  <meta property="og:title" content="BrewAroma — Kopi Craft & Snack Bandung & Cimahi" />
+  <meta property="og:description" content="Kopi craft dan snack artisan. Pesan mudah via WhatsApp." />
+  <meta property="og:url" content="https://brewaroma.vercel.app/" />
+  <meta name="twitter:card" content="summary_large_image" />
```

```diff
--- a/index.html
+++ b/index.html
@@
-        <button id="modal-close" type="button" class="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-white/90 hover:bg-white text-stone-700 font-bold text-lg rounded-full shadow transition-colors" aria-label="Tutup modal">&times;</button>
+        <button id="modal-close" type="button" class="absolute top-3 right-3 w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center bg-white/90 hover:bg-white text-stone-700 font-bold text-lg rounded-full shadow transition-colors" aria-label="Tutup modal">&times;</button>
```

## 7. Skor Lighthouse asli + yang tidak bisa diverifikasi

Hasil run 2026-10-07, serve lokal `python -m http.server 8123`, Chrome headless `--no-proxy-server`.
File: `%TEMP%\opencode\lighthouse-brewaroma-mobile.json`, `%TEMP%\opencode\lighthouse-brewaroma-desktop.json` (file `lighthouse-report.json` lama tidak ditimpa).

| Mode | Performance | Accessibility | Best Practices | SEO |
|------|-------------|---------------|----------------|-----|
| Mobile | 99 | 93 | 100 | 100 |
| Desktop | 100 | 93 | 100 | 100 |

Web Vitals lab: Mobile LCP 1.8s, CLS 0.045, TBT 0ms, FCP 1.4s. Desktop LCP 0.5s, CLS 0.047, TBT 0ms, FCP 0.4s.
Catatan: klaim `README.md:14-20` (95/96/100/100) ternyata konservatif — skor lokal lebih tinggi. Tapi SEO 100 dari Lighthouse menyesatkan: audit otomatis tidak tahu konten produk/testimoni JS-only (S2) dan tanpa OG/canonical (S1). Failing audits mobile: `color-contrast`, `label-content-name-mismatch`, `link-in-text-block`, `unminified-css` (hemat 8KiB), `render-blocking-insight` (hemat 660ms), `image-delivery-insight` (hemat 99KiB).

Awal: `lighthouse-report.json:9-13` gagal (`CHROME_INTERSTITIAL_ERROR`, target `http://localhost:3000/` tanpa server). Klaim README 95/96/100/100 belum terbukti — perlu cek.
Belum verifikasi: Safari iOS, Samsung Internet, sentuh fisik, pembaca layar, pesanan WA nyata, akun IG benar, Core Web Vitals lapangan. Asumsi: kode lokal = deploy live, kecuali IG beda (U3).
