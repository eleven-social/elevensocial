import Link from 'next/link'
import { ArrowRight, Plane, MapPin, TrendingUp } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function Home() {
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
      events = data || []
    }
  } catch (e) {
    events = []
  }

  const cityCount = new Set(
    events.map((e: any) => e.city).filter(Boolean)
  ).size
  const fanFestCount = events.filter(
    (e: any) => e.type === 'fan_festival'
  ).length

  return (
    <div className="bg-stone-950 text-stone-50">
      <Header />

      <section className="relative bg-stone-900 overflow-hidden grain">
        <div className="absolute inset-0 stripe-bg opacity-30" />
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-red-600/25 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="font-mono text-xs tracking-[0.3em] text-red-500 mb-6 flex items-center gap-2">
                <Plane className="w-3 h-3" /> NEW CITY? NEW COUNTRY? WE GOT YOU.
              </div>
              <h1 className="font-display text-[clamp(2.5rem,9vw,8rem)] leading-[0.85] mb-8">
                EVERY<br />
                <span className="text-red-500">MATCH.</span><br />
                EVERY<br />
                <span className="italic">VIBE.</span>
              </h1>
              <p className="text-lg md:text-xl text-stone-300 max-w-xl mb-6">
                The Cup will pull{' '}
                <span className="text-red-500 font-semibold">
                  5+ million traveling fans
                </span>{' '}
                through host cities. Even locals cannot track every venue.
              </p>
              <p className="text-xl md:text-2xl text-stone-50 max-w-xl mb-10 font-display">
                Pubs, lounges, clubs, rooftops, watch parties. Find your event.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/events"
                  className="group bg-red-600 text-stone-50 px-6 md:px-8 py-3 md:py-4 font-headline text-xl md:text-2xl flex items-center gap-3 hover:bg-stone-50 hover:text-stone-900 transition"
                >
                  FIND YOUR EVENT{' '}
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/host"
                  className="border-2 border-stone-50 text-stone-50 px-6 md:px-8 py-3 md:py-4 font-headline text-xl md:text-2xl hover:bg-stone-50 hover:text-stone-900 transition"
                >
                  HOST AN EVENT
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="border-2 border-red-600 p-6 bg-stone-900/50 backdrop-blur">
                <div className="font-mono text-xs text-red-500 tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full pulse-dot inline-block" />
                  LIVE NETWORK
                </div>
                <div className="space-y-4">
                  <Stat label="LISTED EVENTS" value={events.length} />
                  <Stat label="OFFICIAL FAN FESTS" value={fanFestCount} />
                  <Stat label="CITIES" value={cityCount} />
                  <Stat label="DAYS UNTIL KICKOFF" value={17} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 text-stone-900 py-16 md:py-20 border-b-2 border-stone-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="font-mono text-xs tracking-[0.3em] text-stone-500 mb-4">
            // THE PROBLEM
          </div>
          <h2 className="font-display text-4xl md:text-6xl leading-none mb-10 max-w-4xl">
            YOU FLEW IN FOR THE MATCH.{' '}
            <span className="text-red-600">NOW WHAT?</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Problem
              icon={<Plane />}
              title="TRAVELING FANS"
              desc="Millions of visitors will descend on host cities. They do not know which lounge fills with their country flag."
            />
            <Problem
              icon={<MapPin />}
              title="LOCALS, TOO"
              desc="Even locals cannot track 50+ venues. Watch-party posts get buried in stories that vanish in 24 hours."
            />
            <Problem
              icon={<TrendingUp />}
              title="VENUES MISS OUT"
              desc="Bars and watch parties spend money setting up, then hope the right crowd finds them."
            />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="font-mono text-xs tracking-[0.3em] text-stone-500 mb-4">
              // THE FIX
            </div>
            <h2 className="font-display text-5xl md:text-6xl leading-none">
              ONE MAP.<br />EVERY PARTY.
            </h2>
          </div>
          <p className="text-lg text-stone-400 self-end">
            Every official fan festival and watch party in one place. Search by
            city or country, find your event, and walk in.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <Card
            num="01"
            title="PICK YOUR CITY"
            desc="Search any city or browse by country across the USA, Canada, and Mexico."
          />
          <Card
            num="02"
            title="MATCH THE VIBE"
            desc="Fan festivals, watch parties, bars. See the match, the venue, the vibe."
          />
          <Card
            num="03"
            title="GRAB A SEAT"
            desc="Tap for details, registration, or directions. Know the vibe before you go."
          />
        </div>
      </section>

      <footer className="bg-stone-950 border-t border-stone-800 py-8 text-center">
        <div className="font-mono text-xs tracking-[0.3em] text-stone-500">
          2026 ELEVEN-SOCIAL. EVERY MATCH. EVERY VIBE.
        </div>
      </footer>
    </div>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-stone-950/80 border-b border-stone-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/30">
            <span className="text-white font-display text-2xl">11</span>
          </div>
          <span className="font-display text-xl tracking-tight">
            ELEVEN-SOCIAL
          </span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-6">
          <Link
            href="/events"
            className="font-headline text-sm text-stone-300 hover:text-white transition"
          >
            FIND EVENTS
          </Link>
          <Link
            href="/host"
            className="font-headline text-sm px-4 py-2 bg-red-600 hover:bg-stone-50 hover:text-stone-900 transition"
          >
            HOST EVENT
          </Link>
        </nav>
      </div>
    </header>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between items-baseline border-b border-stone-700 pb-3 last:border-0 last:pb-0">
      <span className="font-mono text-xs text-stone-400 tracking-widest">
        {label}
      </span>
      <span className="font-display text-3xl text-stone-50">{value}</span>
    </div>
  )
}

function Problem({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <div className="border-2 border-stone-900 p-6 bg-white">
      <div className="text-red-600 mb-4">{icon}</div>
      <div className="font-display text-2xl mb-2">{title}</div>
      <p className="text-stone-600 text-sm">{desc}</p>
    </div>
  )
}

function Card({
  num,
  title,
  desc,
}: {
  num: string
  title: string
  desc: string
}) {
  return (
    <div className="border-2 border-stone-800 p-6 bg-stone-900/30 hover:border-red-600 transition">
      <div className="font-mono text-xs tracking-widest text-red-500 mb-3">
        {num}
      </div>
      <div className="font-display text-2xl mb-2">{title}</div>
      <p className="text-stone-400 text-sm">{desc}</p>
    </div>
  )
}
