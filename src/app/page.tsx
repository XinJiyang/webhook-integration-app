import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Webhook Integration Demo</h1>
      <p className="mb-8 text-lg">A real-time messaging demo with user isolation.</p>
      <Link href="/dashboard">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Go to Dashboard
        </button>
      </Link>
    </main>
  );
}