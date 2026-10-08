#!/bin/bash
# Script Otomatis Deploy Supabase Edge Function "kiko-smart-hint"
# Gunakan script ini untuk memperbarui server-side AI logic secara otomatis.

echo "🚀 Menyiapkan Deployment Supabase Edge Function: kiko-smart-hint..."

# 1. Tentukan Project Reference dari Environment
PROJECT_REF="sjmnjoiqrtgxhknbnjyd"

# 2. Deploy Edge Function menggunakan Supabase CLI
if command -v npx &> /dev/null; then
  echo "📦 Menjalankan deployment via npx supabase..."
  npx supabase functions deploy kiko-smart-hint --project-ref "$PROJECT_REF" --no-verify-jwt
  echo "✅ Edge Function 'kiko-smart-hint' berhasil diperbarui!"
else
  echo "⚠️ npx/Supabase CLI tidak ditemukan. Silakan jalankan secara manual:"
  echo "   npx supabase functions deploy kiko-smart-hint --project-ref $PROJECT_REF --no-verify-jwt"
fi
