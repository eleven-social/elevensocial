import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function EventDetail({ params }: { params: any }) {
  const { id } = await params
  let event: any = null

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
        .eq('id', id)
        .single()
      event = data
    }
  } catch (e) {
    event = null
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-stone-950 text-stone-50 flex flex-col items-center justify-center px-6">
        <p className="text-stone-400 mb-4">Event not found.</p>
        <Link href="/events" className="text-red-500 hover:text-red-400">
          Back to all events
        </Link>
      </div>
    )
  }

  const isFree = !event.price_cents || event.price_cents === 0
  const fullAddress = [event.venue_name, event.address, event.city, event.state, event.zip_code]
    .filter(Boolean)
    .join(', ')
  const mapsUrl =
    'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(fullAddress)

  const typeLabel =
    event.type === 'bar' ? 'Bar' : event.type === 'watch_party' ? 'Watch Party' : 'Fan Festival'

  function fmtDate(d: string) {
    if (!d) return ''
    try {
      return new Date(d).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    } catch {
      return d
    }
  }

  const dateRange =
    event.event_date_start && event.event_date_end && event.event_date_start !== event.event_date_end
      ? `${fmtDate(event.event_date_start)} – ${fmtDate(event.event_date_end)}`
      : fmtDate(event.event_date_start)

  return (
    <div className="min-h-screen bg-stone-950 text-stone-50">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-stone-950/80 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/30">
              <span className="text-white font-display text-2xl">11</span>
            </div>
            <span className="font-display text-xl tracking-tight">ELEVEN-SOCIAL</span>
          </Link>
          <Link href="/events" className="font-headline text-sm text-stone-300 hover:text-white transition">
            ALL EVENTS
          </Link>
        </div>
      </header>

      <div className="bg-gradient-to-br from-red-700 to-red-900 px-6 py-12 grain">
        <div className="max-w-3xl mx-auto relative">
          <Link href="/events" className="font-mono text-xs text-red-200 hover:text-white mb-6 inline-block tracking-widest">
            &larr; BACK TO ALL EVENTS
          </Link>
          <div className="flex items-center gap-2 mb-4">
            {isFree && (
              <span className="bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                FREE
              </span>
            )}
            <span className="bg-black/30 text-white text-xs px-3 py-1 rounded-full">
              {typeLabel}
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl mb-2 leading-none">{event.name}</h1>
          <p className="text-xl text-red-100">{event.venue_name}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-5">
            <div className="font-mono text-xs uppercase tracking-widest text-red-500 mb-2">LOCATION</div>
            <p className="text-stone-200">
              {event.address && <>{event.address}<br /></>}
              {event.city}, {event.state} {event.zip_code}
            </p>
          </div>
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-5">
            <div className="font-mono text-xs uppercase tracking-widest text-red-500 mb-2">DATES</div>
            <p className="text-stone-200">{dateRange || 'During the tournament'}</p>
          </div>
        </div>

        {event.match_info && (
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-5">
            <div className="font-mono text-xs uppercase tracking-widest text-red-500 mb-2">MATCHES</div>
            <p className="text-stone-200">{event.match_info}</p>
          </div>
        )}

        {event.description && (
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-stone-500 mb-2">ABOUT</div>
            <p className="text-stone-300 leading-relaxed text-lg">{event.description}</p>
          </div>
        )}

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-stone-900 border border-stone-800 rounded-xl p-6 hover:border-red-600 transition group"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-display text-xl mb-1">{event.venue_name}</div>
              <p className="text-stone-400 text-sm">{event.city}, {event.state}</p>
            </div>
            <span className="text-red-500 group-hover:text-red-400 font-headline text-sm whitespace-nowrap">
              OPEN IN MAPS &rarr;
            </span>
          </div>
        </a>

        <div className="flex flex-wrap gap-3">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-stone-800 hover:bg-stone-700 text-white px-6 py-3 rounded-lg font-headline transition"
          >
            GET DIRECTIONS
          </a>
          {event.registration_url && (
            <a
              href={event.registration_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-lg font-headline transition"
            >
              LEARN MORE / REGISTER
            </a>
          )}
        </div>
      </div>

      <footer className="bg-stone-950 border-t border-stone-800 py-8 text-center mt-10">
        <div className="font-mono text-xs tracking-[0.3em] text-stone-500">
          2026 ELEVEN-SOCIAL. EVERY MATCH. EVERY VIBE.
        </div>
      </footer>
    </div>
  )
}