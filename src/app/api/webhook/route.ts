import { NextRequest, NextResponse } from 'next/server';

type Message = {
  userId: string;
  name: string;
  message: string;
  timestamp: number;
};

// Temporary in-memory database
const messages: Record<string, Message[]> = {};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, name, message } = body;

  if (!userId || !name || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const newMessage = {
    userId,
    name,
    message,
    timestamp: Date.now(),
  };

  if (!messages[userId]) {
    messages[userId] = [];
  }
  messages[userId].push(newMessage);

  return NextResponse.json({ success: true, data: newMessage });
}

// Expose in-memory data for the messages API (development use only)
export function getMessages() {
  return messages;
}
