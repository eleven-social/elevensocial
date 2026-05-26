import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function EventsPage() {
  let events: any[] = []

  try {
    const { createClient } = await import('@supabase/supabase-js')
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey)
      const { data } = await supabase
        .from('events')
        .select('*')
        .eq('is_active', true)
        .order('event_date_start', { ascending: true })
      events = data || []
    }
  } catch (e) {
    events = []
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white text-lg font-bold">
            11
          </div>
          <span className="font-bold text-xl">Eleven-Social</span>
        </Link>
        <Link href="/" className="text-sm text-zinc-400 hover:text-white">
          Home
        </Link>
      </header>

      <section className="px-6 py-12 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Find Watch Parties</h1>
        <p className="text-zinc-400 text-lg">
          {events.length} events across the country
        </p>
      </section>

      <section className="px-6 pb-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event: any) => (
            <div
              key={event.id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-red-600 transition"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                  FREE
                </span>
                <span className="bg-zinc-800 text-zinc-300 text-xs px-2 py-1 rounded">
                  Fan Festival
                </span>
              </div>

              <h3 className="text-xl font-bold mb-1">{event.name}</h3>
              <p className="text-zinc-400 text-sm mb-3">{event.venue_name}</p>
              <p className="text-zinc-300 text-sm mb-2">
                {event.city}, {event.state}
              </p>
              <p className="text-zinc-400 text-sm mb-4">{event.match_info}</p>
              <p className="text-zinc-500 text-sm mb-4">{event.description}</p>

              {event.registration_url && (
                <a
                  href={event.registration_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-red-500 hover:text-red-400 text-sm font-medium"
                >
                  Learn More
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-zinc-800 px-6 py-6 text-center text-zinc-500 text-sm">
        2026 Eleven-Social
      </footer>
    </div>
  )
}

