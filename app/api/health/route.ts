import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    platform: 'Blokuma Platform Engine',
    timestamp: new Date().toISOString(),
  });
}
