# Dokumen Rencana Perbaikan Antarmuka, Navigasi, & Arsitektur Blokuma

## 1. Ringkasan Perubahan Utama
* **Penyederhanaan Navigasi:** Menghapus menu **Belajar** dari sidebar. Seluruh alur pembelajaran dan materi dialihkan secara utuh ke menu **Petualangan**.
* **Manajemen Kurikulum Berbasis Database:** Materi dan misi di menu Petualangan disimpan di database dan disaring (*filter*) secara dinamis berdasarkan tingkat kelas siswa.
* **Redesain Antarmuka Playground:**
  * Mempertahankan tata letak 3 kolom di bagian atas untuk merakit kode.
  * Memperbarui panel pratinjau Kiko di sebelah kanan dengan animasi melayang (*floating/hovering animation*).
  * Menambahkan komponen **Kiko Stage** (*full-width*) di bagian bawah yang hanya muncul saat tombol "Jalankan Kreasimu!" ditekan.
* **Navigasi Halaman Permainan Galeri:** Memperbaiki fungsi tombol **Mainkan 🎮** di menu Galeri agar mengarahkan pengguna ke halaman baru (*dedicated game page*) yang terpisah sesuai judul permainan yang dipilih.

---

## 2. Struktur Sidebar & Integrasi Database Kurikulum

### A. Perubahan Sidebar Navigasi
Menu sidebar aktif (Menu **Belajar** resmi dihapus):
1. Beranda
2. Petualangan *(Pusat Pembelajaran Utama)*
3. Playground
4. Projects
5. Achievements
6. Galeri
7. Progress
8. Pengaturan

---

### B. Arsitektur Database Kurikulum & Filter Kelas
* **Skema Tabel Database (`curriculum_missions`):**
  * `id`: Primary Key
  * `target_class`: Integer (Tingkat Kelas 1 - 6)
  * `island_number`: Integer (Pulau 1 - 6)
  * `island_title`: String
  * `mission_description`: Text
  * `required_blocks`: JSON / Array (Jenis balok yang dibutuhkan)
  * `is_locked`: Boolean
* **Logika Pemfilteran:**
  Saat pengguna membuka menu **Petualangan**, sistem membaca data tingkat kelas siswa dari profil akun (misal: *Kelas 3 SD*), lalu mengambil 6 data pulau dari database yang memiliki `target_class = 3`.

---

### C. Pemetaan 6 Pulau Petualangan Berdasarkan Kelas

#### 1. Kurikulum Kelas 1–2 SD: Dunia Ikon & Suara
* **Fokus:** Pengenalan urutan visual, pola audio/gambar, dan arah sederhana.
* **Daftar Pulau:**
  1. **Pulau 1:** Taman Suara (Urutan Ikon Musik)
  2. **Pulau 2:** Hutan Langkah (Arah & Urutan Sederhana)
  3. **Pulau 3:** Danau Warna (Mencocokkan Pola Warna)
  4. **Pulau 4:** Buah Gemas (Perulangan Gambar Sederhana)
  5. **Pulau 5:** Pesta Hewan (Perpaduan Suara & Gerak)
  6. **Pulau 6:** Istana Bintang (Tantangan Jalur Akhir)

#### 2. Kurikulum Kelas 3–4 SD: Dunia Blok & Logika
* **Fokus:** Urutan instruksi (*sequence*), perulangan (*loop*), dan percabangan sederhana (*if*).
* **Daftar Pulau:**
  1. **Pulau 1:** Desa Urutan (Langkah pertama Kiko menuju gerbang desa)
  2. **Pulau 2:** Hutan Perulangan (Bantu Kiko melompati pohon lebat dengan *loop* 3 kali)
  3. **Pulau 3:** Gunung Kondisi (Memilih jalur aman dengan balok *If*)
  4. **Pulau 4:** Rawa Rintangan (Kombinasi *Loop* + *If*)
  5. **Pulau 5:** Goa Misteri (Navigasi sensor di tempat gelap)
  6. **Pulau 6:** Benteng Kiko (Menyusun algoritma lengkap)

#### 3. Kurikulum Kelas 5–6 SD: Dunia Algoritma & Game
* **Fokus:** Variabel, kondisi majemuk, dan mekanika game interaktif.
* **Daftar Pulau:**
  1. **Pulau 1:** Kota Variabel (Pengumpulan koin & penghitung skor)
  2. **Pulau 2:** Arena Tembak Skor (Perhitungan waktu & poin)
  3. **Pulau 3:** Labirin Algoritma (Penyelesaian rute kompleks)
  4. **Pulau 4:** Cyber City (Deteksi benturan/collision)
  5. **Pulau 5:** Boss Battle Logic (Timer & logika berlapis)
  6. **Pulau 6:** Antariksa Kode (Membuat game mini)

---

## 3. Redesain Antarmuka Menu Playground

### A. Bagian Atas (Kanvas 3 Kolom)
Tampilan tetap menjaga kerapian tata letak 3 kolom:
1. **Kolom 1 - Ambil Balok Perintah:** Daftar balok instruksi yang bisa diklik/diseret.
2. **Kolom 2 - Kanvas Rakit Kode:** Area untuk menyusun urutan balok perintah.
3. **Kolom 3 - Pratinjau Panggung Kiko:**
   * Menampilkan karakter robot Kiko dengan gerakan idle **mengambang ke atas dan ke bawah secara perlahan** (*floating/hovering animation*).
   * Berisi status ketersediaan balok dan tombol utama **"▶ Jalankan Kreasimu! 🚀"**.

---

### B. Bagian Bawah: Kiko Stage (Full-Width Action Stage)

#### 1. Mekanisme Kemunculan
* Secara bawaan (*default*), area **Kiko Stage** di bawah 3 kolom tidak terlihat atau tersembunyi.
* Saat siswa menekan tombol **"Jalankan Kreasimu!"**, komponen **Kiko Stage** akan muncul meluncur (*slide-in / fade-in*) memenuhi lebar bawah layar secara penuh (*full-width*).

#### 2. Visual & Perilaku Karakter di Kiko Stage
* **Sistem Latar Belakang Parallax:** Latar belakang bergerak secara kontinu dari kanan ke kiri, menciptakan ilusi visual seolah Kiko sedang bergerak maju.
* **Perilaku Maskot Kiko:** Posisi maskot Kiko tetap berada di sisi kiri panggung, namun melakukan aksi sesuai urutan balok perintah yang disusun (misalnya melangkah, melompat, atau memutar).
* **Adaptasi Visual 6 Pulau:** Tema latar belakang dan objek rintangan di Kiko Stage menyesuaikan pulau yang sedang dimainkan:
  * **Pulau 1 (Desa Urutan):** Latar desa, jalan datar, awan bergeser, Kiko melakukan animasi melangkah.
  * **Pulau 2 (Hutan Perul