import Link from 'next/link'
import EventsList from './EventsList'

export const dynamic = 'force-dynamic'

export default async function EventsPage() {
  let events: any[] = []

  try {
    const { createClient } = await import('@supabase/supabase-js')
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key =
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (url && key) {
      const supabase = createClient(url, key)
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
    <div className="bg-stone-950 text-stone-50 min-h-screen">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-stone-950/80 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/30">
              <span className="text-white font-display text-2xl">11</span>
            </div>
            <span className="font-display text-xl tracking-tight">ELEVEN-SOCIAL</span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-6">
            <Link href="/events" className="font-headline text-sm text-stone-300 hover:text-white transition">
              FIND EVENTS
            </Link>
            <Link href="/host" className="font-headline text-sm px-4 py-2 bg-red-600 hover:bg-stone-50 hover:text-stone-900 transition">
              HOST EVENT
            </Link>
          </nav>
        </div>
      </header>

      <EventsList events={events} />

      <footer className="bg-stone-950 border-t border-stone-800 py-8 text-center">
        <div className="font-mono text-xs tracking-[0.3em] text-stone-500">
          2026 ELEVEN-SOCIAL. EVERY MATCH. EVERY VIBE.
        </div>
      </footer>
    </div>
  )
}
