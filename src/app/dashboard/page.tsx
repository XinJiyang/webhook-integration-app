'use client';

import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Dashboard() {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  type Message = {
    name: string;
    message: string;
    timestamp: number;
  };

  const [messages, setMessages] = useState<Message[]>([]);

  // Initialize userId and store it in localStorage to persist across page reloads
  useEffect(() => {
    let storedId = localStorage.getItem('userId');
    if (!storedId) {
      storedId = uuidv4();
      localStorage.setItem('userId', storedId);
    }
    setUserId(storedId);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) return;

    const payload = { userId, name, message };

    await fetch('http://localhost:4000/webhook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    setMessage('');
  };

  // Poll to fetch messages for the current user periodically
  useEffect(() => {
    if (!userId) return;

    const interval = setInterval(async () => {
      const res = await fetch(`http://localhost:4000/messages/${userId}`);
      const data = await res.json();
      setMessages(data);
    }, 2000);

    return () => clearInterval(interval);
  }, [userId]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="border p-2 w-full"
          required
        />
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Send
        </button>
      </form>

      <h3 className="text-xl mb-2">Messages</h3>
      <ul className="space-y-2">
        {messages.map((msg, index) => (
          <li key={index} className="border p-2 rounded">
            <strong>{msg.name}</strong>: {msg.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
