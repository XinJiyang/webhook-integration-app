import { NextRequest, NextResponse } from 'next/server';
import { getMessages } from '../webhook/route';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }

  const messages = getMessages();
  const userMessages = messages[userId] || [];

  return NextResponse.json(userMessages);
}
