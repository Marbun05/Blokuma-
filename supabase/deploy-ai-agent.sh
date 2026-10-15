#!/bin/bash
# Script Otomatis Deploy Edge Function kiko-ai-agent ke Supabase

echo "===================================================="
echo "🚀 Deploying Supabase Edge Function: kiko-ai-agent..."
echo "===================================================="

PROJECT_REF="sjmnjoiqrtgxhknbnjyd"
ACCESS_TOKEN="${PAT_SUPABASE:-$SUPABASE_ACCESS_TOKEN}"

if command -v npx &> /dev/null; then
  echo "📦 Menjalankan deployment via npx supabase..."
  SUPABASE_ACCESS_TOKEN="$ACCESS_TOKEN" npx supabase functions deploy kiko-ai-agent --project-ref "$PROJECT_REF" --no-verify-jwt
  echo "===================================================="
  echo "✅ Edge Function 'kiko-ai-agent' Berhasil Dideploy!"
  echo "===================================================="
else
  echo "⚠️ npx tidak ditemukan. Silakan jalankan secara manual:"
  echo "   SUPABASE_ACCESS_TOKEN=$ACCESS_TOKEN npx supabase functions deploy kiko-ai-agent --project-ref $PROJECT_REF --no-verify-jwt"
fi
