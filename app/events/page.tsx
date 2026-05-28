import Link from 'next/link'
import EventsList from './EventsList'

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

      <EventsList events={events} />

      <footer className="border-t border-zinc-800 px-6 py-6 text-center text-zinc-500 text-sm">
        2026 Eleven-Social
      </footer>
    </div>
  )
}
