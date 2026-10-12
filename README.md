# BLOKUMA — Adaptive Visual Coding Platform 🚀

> "Rancang, Buat, dan Hidupkan Karyamu dengan Kode!"

**Blokuma** adalah sebuah platform edukasi koding visual yang dirancang khusus dan adaptif untuk anak-anak sekolah dasar (SD Kelas 1–6, usia 6–12 tahun). Misi utama platform ini adalah menghilangkan rasa takut anak terhadap bahasa pemrograman melalui pendekatan *Storyfication* (bercerita), antarmuka balok visual, dan bimbingan Socratic dari AI (Artificial Intelligence).

---

## 🌟 Fitur Utama
* **Peta Petualangan (6 Pulau Kurikulum):** Menyediakan rute belajar yang disesuaikan dengan fase Kurikulum Merdeka.
* **Kanvas Playground Dinamis:** Arena eksperimen tempat anak-anak merangkai kode dan langsung melihat aksi karakter (Maskot Kiko) secara *real-time*.
* **Socratic AI Guidance (Kiko Smart Hint):** Mesin kognitif berbasis LLM yang membimbing anak menemukan sendiri logika yang salah tanpa langsung memberikan jawaban mentah.
* **AI Storyfication:** Mengubah susunan struktur kode balok anak menjadi sebuah narasi/dongeng petualangan ajaib.
* **Galeri Publik & Workspace:** Area untuk memamerkan proyek yang sudah dibuat dan memainkannya kembali.
* **Role-Based Access (Multi-role):** Memiliki panel independen yang terhubung ke satu *Single Source of Truth* database untuk **Siswa, Guru, Orang Tua, dan Admin**.

---

## 🛠 Tech Stack & Ecosystem
- **Frontend Architecture**: React 19, Vite 6, Tailwind CSS v3, React Router DOM v7.
- **State Management**: Zustand (untuk fluid state sharing, seperti otentikasi).
- **Backend & Database**: Supabase (PostgreSQL, Row Level Security, Edge Functions).
- **AI Models (Serverless)**: 
  - `qwen/qwen3.8-27b` untuk Socratic Logic
  - `openai/gpt-oss-120b` untuk Storyfication.

---

## 📂 Struktur Folder Proyek
Proyek ini mengadopsi standar arsitektur berbasis fitur (*feature-based routing*) yang rapi dan terukur:

```text
Blokuma/
├── 01 Docs/                            # Kumpulan dokumentasi lama (Legacy)
├── 02 Docs Acuan AI Agent/             # Vibe Coding Manifesto & pedoman AI
├── 03 Jurnal Prompt (Maks 5) + Log Mentah/ # Catatan eksekusi & prompt arsitektur
├── app/                                # Root Aplikasi berbasis React Router
│   ├── (admin)/admin/                  # Panel Admin (CRUD Master Data Playground)
│   ├── (parent)/parent/                # Panel Dasbor Orang Tua
│   ├── (public)/                       # Halaman Publik (Landing Page, Login, Register)
│   ├── (student)/app/                  # Halaman Utama Siswa
│   │   ├── achievements/               # Lemari Lencana & Medali
│   │   ├── adventure/                  # Peta Kurikulum Petualangan
│   │   ├── dashboard/                  # Dasbor Utama Anak
│   │   ├── gallery/                    # Pameran Proyek Publik
│   │   ├── learn/                      # Modul Pembelajaran per Level
│   │   ├── playground/                 # Kanvas Visual Coding Utama
│   │   ├── progress/                   # Statistik Belajar
│   │   ├── projects/                   # Ruang Kerja (Workspace) Pribadi
│   │   └── settings/                   # Pengaturan Akun
│   └── (teacher)/teacher/              # Panel Dasbor Guru
├── components/                         # Komponen Reusable (UI & Navigasi)
│   ├── navigation/                     # Layouting Navbar, Sidebar, Footer
│   └── ui/                             # Komponen Atomik (Modals, Custom Cursor, Kiko AI)
├── engine/                             # Mesin Evaluasi Koding (Parsing, AST, Generator)
├── lib/                                # Utilities & Konektor Eksternal
│   ├── blockEngine/                    # AST Analyzer Core
│   └── supabase/                       # Supabase Clients & API Wrappers
├── public/                             # Aset Statis (Images, Sounds)
├── store/                              # Global State (Zustand)
├── supabase/                           # Konfigurasi Supabase lokal & Edge Functions
├── tests/                              # Unit Testing (Vitest)
└── package.json                        # Definisi dependency & NPM scripts
```

---

## 🚀 Memulai Pengembangan (Local Development)

Ikuti langkah-langkah di bawah untuk menjalankan server lokal di mesin Anda:

1. **Install Dependencies**
   Pastikan Anda sudah menginstal Node.js versi 18+.
   ```bash
   npm install
   ```

2. **Setup Variabel Lingkungan (Environment)**
   Salin file `.env.example` menjadi `.env` lalu masukkan _Supabase URL_ dan _Anon Key_ Anda.
   ```bash
   cp .env.example .env
   ```

3. **Jalankan Vite Dev Server**
   ```bash
   npm run dev
   ```
   Buka `http://localhost:3000` di peramban (browser) untuk melihat hasilnya.

4. **Kompilasi Produksi (Production Build)**
   ```bash
   npm run build
   ```

---
*Dikembangkan dengan semangat **Vibe Coding** yang mengutamakan clean code, skalabilitas, dan User Experience yang memukau!* ✨
