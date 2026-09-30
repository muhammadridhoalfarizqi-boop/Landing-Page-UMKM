const products = [
  {
    id: 1,
    nama: "Kopi Arabica Single Origin",
    harga: 45000,
    gambar: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=400&fit=crop&crop=center&fm=webp&q=75",
    deskripsi: "Kopi arabica asli dataran tinggi, terpilih untuk profil rasa manis dengan note karamel dan coklat gelap. Roast medium untuk profil rasa yang seimbang, rasa ampas yang tipis dan bersih. Cocok untuk hand-brew atau espresso manual. Setiap batch diground perlahan agar aroma tetap segar hingga sampai di tangan Anda.",
    rating: 4.9,
    jumlahReview: 128
  },
  {
    id: 2,
    nama: "Cold Brew Classic",
    harga: 52000,
    gambar: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&h=400&fit=crop&crop=center&fm=webp&q=75",
    deskripsi: "Ekstraksi dingin selama 18 jam untuk hasil kopi yang bold, smooth dan rendah asam. Rasa kaya dan pekat dengan finish yang panjang tanpa membuat perut terasa panas. Dihidangkan dengan sedikit pucuk sirup rami agar rasa kopi tetap dominan namun ada sentuhan manis yang bersih.",
    rating: 4.8,
    jumlahReview: 96
  },
  {
    id: 3,
    nama: "Matcha Latte Mix",
    harga: 68000,
    gambar: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=400&fit=crop&crop=center&fm=webp&q=75",
    deskripsi: "Ceremonial grade matcha asli Jepang, dicampur dengan susu segar dan sedikit gula aren organik. Crema lembut dan smooth, rasa matcha yang pahit segar bukan pahit asam. Ideal untuk yang ingin alternatif kopi tapi tetap terasa kaya rasa dan tidak berlebihan.",
    rating: 4.7,
    jumlahReview: 84
  },
  {
    id: 4,
    nama: "Kopi Caramel Macchiato",
    harga: 58000,
    gambar: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&h=400&fit=crop&crop=center&fm=webp&q=75",
    deskripsi: "Espresso kuat diatas layer foam susu, dengan sirup caramel buttery dan sentuhan garam laut. Rasa kopi tetap dominan, caramel tidak manis berlebihan. Cocok untuk yang suka kopi dengan sensasi rasa berlapis dan aroma caramel yang harum sejak pertama dicium.",
    rating: 4.6,
    jumlahReview: 152
  },
  {
    id: 5,
    nama: "Chai Latte Spice",
    harga: 49000,
    gambar: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&h=400&fit=crop&crop=center&fm=webp&q=75",
    deskripsi: "Campuran teh hitam pekat dengan rempah pilihan: kapulaga, jahe, dan kayu manis. Rasa hangat dan rempahnya kaya tapi tidak menusuk. Cocok untuk sore santai atau sebagai teman kerja saat ingin suasana yang lebih tenang dan nyaman.",
    rating: 4.5,
    jumlahReview: 61
  },
  {
    id: 6,
    nama: "Cappuccino Starter Kit",
    harga: 125000,
    gambar: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop&crop=center&fm=webp&q=75",
    deskripsi: "Paket lengkap untuk mulai ngopi barista di rumah: termasuk tamper stainless, milk frother sederhana, dan panduan resept cappuccino step-by-step. Dibuat dari bahan tahan lama dan mudah dibersihkan. Ideal untuk pemula yang ingin belajar membuat kopi sendiri dengan hasil yang konsisten.",
    rating: 4.9,
    jumlahReview: 73
  },
  {
    id: 7,
    nama: "Kopi Robusta Premium",
    harga: 39000,
    gambar: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&h=400&fit=crop&crop=center&fm=webp&q=75",
    deskripsi: "Robusta pilihan dengan karakter kuat dan crema tebal. Kafeinnya lebih tinggi dari arabica, cocok untuk yang suka kopi dengan body pekat dan rasa pahit yang bersih. Bisa diminum langsung, atau dicampur dengan susu untuk yang lebih lembut.",
    rating: 4.4,
    jumlahReview: 211
  },
  {
    id: 8,
    nama: "Oat Milk Latte 3in1",
    harga: 47000,
    gambar: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&h=400&fit=crop&crop=center&fm=webp&q=75",
    deskripsi: "Sachet praktis yang sudah mengandung kopi, oat milk dan sedikit gula kelapa. Tinggal seduh dengan air panas, rasa sudah seimbang. Ringan dan tidak terlalu manis, cocok untuk yang sedang mengurangi konsumsi dairy tapi tetap ingin nikmati kopi dengan rasa lembut.",
    rating: 4.7,
    jumlahReview: 102
  }
];

const testimonials = [
  {
    nama: "Dian Suroso",
    avatar: "https://i.pravatar.cc/150?u=dian.suroso",
    komentar: "Arabica-nya luar biasa! Aromanya seger banget dan rasanya clean. Pengiriman cepat, packaging rapi. Sudah repeat order tiga kali dan tidak pernah kecewa.",
    rating: 5
  },
  {
    nama: "Mia Kartika",
    avatar: "https://i.pravatar.cc/150?u=mia.kartika",
    komentar: "Cold Brew Classic sangat smooth dan tidak terlalu asam — persis yang saya cari. Botolnya aman, kualitas kopi benar-benar premium. Recommended banget untuk yang cari kopi berkualitas.",
    rating: 5
  },
  {
    nama: "Tengku Ramadhan",
    avatar: "https://i.pravatar.cc/150?u=tengku.ramadhan",
    komentar: "Proses pemesanan via WhatsApp sangat mudah dan responsif. Produk sesuai deskripsi, harga fair. Sudah dua bulan jadi pelanggan tetap dan pelayanan konsisten baik.",
    rating: 4
  },
  {
    nama: "Lina Hashimoto",
    avatar: "https://i.pravatar.cc/150?u=lina.hashimoto",
    komentar: "Matcha Latte Mix-nya istimewa! Ceremonial grade-nya terasa banget, creamy dan tidak terlalu manis. Ini salah satu matcha terbaik yang pernah saya coba di luar kafe.",
    rating: 5
  }
];
