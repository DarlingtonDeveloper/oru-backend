import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] text-center">
      <h1 className="text-5xl font-bold mb-4">🎯 Oru</h1>
      <p className="text-xl max-w-xl mb-8 text-gray-800">
        Take control of your digital habits by tracking when you get distracted by apps like Instagram, TikTok, and more.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl w-full mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-bold mb-2 text-black">How It Works</h2>
          <ol className="text-left list-decimal pl-5 space-y-2 text-gray-800">
            <li>Set up the Oru shortcut on your iOS device</li>
            <li>Configure which apps you want to track</li>
            <li>When you catch yourself mindlessly scrolling, tap the shortcut</li>
            <li>View your distraction patterns in the dashboard</li>
          </ol>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-bold mb-2 text-black">Benefits</h2>
          <ul className="text-left list-disc pl-5 space-y-2 text-gray-800">
            <li>Become more aware of your digital habit patterns</li>
            <li>Track which apps are most distracting for you</li>
            <li>See what times of day you're most likely to get distracted</li>
            <li>Use data insights to build better habits</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/onboard"
          className="px-6 py-3 bg-black text-white rounded-lg font-bold text-lg shadow-md hover:bg-gray-800 transition"
        >
          Get Started
        </Link>

        <Link
          href="/dashboard"
          className="px-6 py-3 bg-white text-black border border-gray-300 rounded-lg font-bold text-lg shadow-sm hover:bg-gray-50 transition"
        >
          View Demo Dashboard
        </Link>
      </div>
    </div>
  );
}