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
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
        <p className="text-zinc-400 mb-4">Event not found.</p>
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
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white text-lg font-bold">
            11
          </div>
          <span className="font-bold text-xl">Eleven-Social</span>
        </Link>
        <Link href="/events" className="text-sm text-zinc-400 hover:text-white">
          All Events
        </Link>
      </header>

      <div className="bg-gradient-to-br from-red-700 to-red-900 px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <Link href="/events" className="text-sm text-red-200 hover:text-white mb-6 inline-block">
            &larr; Back to all events
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
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{event.name}</h1>
          <p className="text-xl text-red-100">{event.venue_name}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <div className="text-xs uppercase tracking-widest text-zinc-500 mb-2">📍 Location</div>
            <p className="text-zinc-200">
              {event.address && <>{event.address}<br /></>}
              {event.city}, {event.state} {event.zip_code}
            </p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <div className="text-xs uppercase tracking-widest text-zinc-500 mb-2">📅 Dates</div>
            <p className="text-zinc-200">{dateRange || 'During the tournament'}</p>
          </div>
        </div>

        {event.match_info && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <div className="text-xs uppercase tracking-widest text-zinc-500 mb-2">⚽ Matches</div>
            <p className="text-zinc-200">{event.match_info}</p>
          </div>
        )}

        {event.description && (
          <div>
            <div className="text-xs uppercase tracking-widest text-zinc-500 mb-2">About</div>
            <p className="text-zinc-300 leading-relaxed text-lg">{event.description}</p>
          </div>
        )}

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-red-600 transition group"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold mb-1">📍 {event.venue_name}</div>
              <p className="text-zinc-400 text-sm">{event.city}, {event.state}</p>
            </div>
            <span className="text-red-500 group-hover:text-red-400 font-medium text-sm whitespace-nowrap">
              Open in Maps &rarr;
            </span>
          </div>
        </a>

        <div className="flex flex-wrap gap-3">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            Get Directions
          </a>
          {event.registration_url && (
            <a
              href={event.registration_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              Learn More / Register
            </a>
          )}
        </div>
      </div>

      <footer className="border-t border-zinc-800 px-6 py-6 text-center text-zinc-500 text-sm mt-10">
        2026 Eleven-Social
      </footer>
    </div>
  )
}
