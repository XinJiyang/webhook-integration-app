// src/app/api/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';

const messagesByUser: Record<string, { name: string; message: string; timestamp: number }[]> = {};

export async function POST(req: NextRequest) {
  const { userId, name, message } = await req.json();

  if (!userId || !name || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const newMessage = {
    name,
    message,
    timestamp: Date.now(),
  };

  if (!messagesByUser[userId]) {
    messagesByUser[userId] = [];
  }

  messagesByUser[userId].push(newMessage);

  return NextResponse.json({ success: true });
}
