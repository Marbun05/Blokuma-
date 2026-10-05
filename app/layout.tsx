import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Blokuma — Belajar Coding dengan Cara Membangun!',
  description: 'Platform edukasi visual coding adaptif untuk anak SD kelas 1–6 (usia 6–12 tahun). Rancang, buat, dan hidupkan karyamu!',
  keywords: ['belajar coding anak', 'coding untuk anak', 'programming anak SD', 'visual coding'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
