export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
            <span className="text-white font-serif text-xl font-bold">11</span>
          </div>
          <span className="font-bold text-lg">Eleven-Social</span>
        </div>
        <button className="text-sm font-medium hover:text-red-500 transition">
          Host Event
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold mb-4 tracking-tight">
          Every Match. <span className="text-red-600">Every Vibe.</span>
        </h1>
        <p className="text-lg sm:text-xl text-zinc-400 max-w-xl mb-10">
          Find World Cup 2026 watch parties happening near you.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md mb-8">
          <input
            type="text"
            placeholder="Enter your zip code"
            className="flex-1 px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 transition"
          />
          <button className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition">
            Find Events
          </button>
        </div>

        <p className="text-sm text-zinc-500">
          ⚽ World Cup starts June 11, 2026
        </p>
      </main>

      <footer className="px-6 py-6 border-t border-zinc-800 text-center text-sm text-zinc-500">
        © 2026 Eleven-Social
      </footer>
    </div>
  );
}