// src/app/api/messages/route.ts
import { NextRequest, NextResponse } from 'next/server';

const messagesByUser =
  globalThis.messagesStore ||
  (globalThis.messagesStore = {});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }

  const messages = messagesByUser[userId] || [];
  return NextResponse.json(messages);
}
