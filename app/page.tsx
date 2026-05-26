import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { ArrowRight, Plane, MapPin, TrendingUp, Check, Flame, Star, Trophy } from 'lucide-react'

force-dynamic revalidate = 60


export default async function Home() {
  const { data: allEvents } = await supabase
    .from('events')
    .select('*')
    .eq('is_active', true)

  const events = allEvents || []
  const cityCount = new Set(events.map((e: any) => e.city).filter(Boolean)).size
  const fanFestCount = events.filter((e: any) => e.type === 'fan_festival').length
  const foundingSlotsLeft = 25

  return (
    <div className="bg-stone-950 text-stone-50">
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

      <section className="relative bg-stone-900 overflow-hidden grain">
        <div className="absolute inset-0 stripe-bg opacity-30"></div>
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-red-600/25 to-transparent"></div>

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
                The Cup will pull <span className="text-red-500 font-semibold">5+ million traveling fans</span> through host cities. Even locals cannot track every venue on Instagram.
              </p>
              <p className="text-xl md:text-2xl text-stone-50 max-w-xl mb-10 font-display">
                Pubs, lounges, clubs, rooftops, watch parties. Find your event.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/events" className="group bg-red-600 text-stone-50 px-6 md:px-8 py-3 md:py-4 font-headline text-xl md:text-2xl flex items-center gap-3 hover:bg-stone-50 hover:text-stone-900 transition">
                  FIND YOUR EVENT <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/host" className="border-2 border-stone-50 text-stone-50 px-6 md:px-8 py-3 md:py-4 font-headline text-xl md:text-2xl hover:bg-stone-50 hover:text-stone-900 transition">
                  HOST AN EVENT
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="border-2 border-red-600 p-6 bg-stone-900/50 backdrop-blur">
                <div className="font-mono text-xs text-red-500 tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full pulse-dot inline-block"></span>
                  LIVE NETWORK
                </div>
                <div className="space-y-4">
                  <Stat label="LISTED EVENTS" value={events.length} />
                  <Stat label="OFFICIAL FAN FESTS" value={fanFestCount} />
                  <Stat label="HOST CITIES" value={cityCount} />
                  <Stat label="DAYS UNTIL KICKOFF" value={17} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 text-stone-900 py-16 md:py-20 border-b-2 border-stone-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="font-mono text-xs tracking-[0.3em] text-stone-500 mb-4">// THE PROBLEM</div>
          <h2 className="font-display text-4xl md:text-6xl leading-none mb-10 max-w-4xl">
            YOU FLEW TO ATLANTA FOR ARGENTINA <span className="text-red-600">vs.</span> CROATIA. NOW WHAT?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Problem icon={<Plane />} title="TRAVELING FANS" desc="Millions of international visitors will descend on host cities. They do not know which lounge fills with their country flag, or which neighborhood has the energy." />
            <Problem icon={<MapPin />} title="LOCALS, TOO" desc="Even locals cannot track 50+ venues on Instagram. Watch-party posts get buried in stories that vanish in 24 hours." />
            <Problem icon={<TrendingUp />} title="VENUES MISS OUT" desc="Bars, clubs, lounges, and watch parties spend money setting up, then hope the right crowd finds them. Most do not fill until the second half." />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="font-mono text-xs tracking-[0.3em] text-stone-500 mb-4">// THE FIX</div>
            <h2 className="font-display text-5xl md:text-6xl leading-none">ONE MAP.<br />EVERY PARTY.</h2>
          </div>
          <p className="text-lg text-stone-400 self-end">
            Listed venues post their matchday. Every game they are showing, the vibe, the music, the food. Fans search by zip, find their event, and walk in.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <Card num="01" title="DROP A ZIP" desc="Any US zip code. We pull every listed event within range, sorted by distance." />
          <Card num="02" title="MATCH THE VIBE" desc="Filter by match, country, venue type, music, food, age. Find a rooftop with bottle service or a quiet pub. Your call." />
          <Card num="03" title="GRAB A SEAT" desc="Tap for tickets, RSVP, or call ahead. Walk in knowing the vibe before you go." />
        </div>
      </section>

      <section className="bg-stone-900 text-stone-50 py-16 md:py-20 relative grain">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-12">
            <div className="font-mono text-xs tracking-[0.3em] text-red-500 mb-4">// FOR VENUES</div>
            <h2 className="font-display text-5xl md:text-6xl mb-4 leading-none">FILL EVERY SEAT.</h2>
            <p className="text-lg text-stone-300 max-w-2xl mx-auto mb-6">
              Post one calendar day at a time. Show as many games as you want that day, same price. Hosting again next week? Post again.
            </p>
          </div>

          <div className="max-w-3xl mx-auto mb-10 border-2 border-red-600 bg-red-600/10 p-6 flex flex-col md:flex-row gap-4 items-center">
            <div className="bg-red-600 text-stone-50 p-3 flex-shrink-0">
              <Flame className="w-8 h-8" strokeWidth={2.5} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="font-display text-2xl text-red-500 mb-1">FOUNDING VENUE PROMO</div>
              <p className="text-stone-300">The first 25 venues get their first <span className="text-red-500 font-semibold">3 matchday posts free</span>. After that, $15/post like everyone else.</p>
            </div>
            <div className="text-center">
              <div className="font-display text-5xl text-red-500 leading-none">{foundingSlotsLeft}</div>
              <div className="font-mono text-xs text-stone-400 tracking-widest mt-1">SLOTS LEFT</div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="border-2 border-red-600 bg-stone-900 p-6 md:p-10 text-center">
              <div className="font-mono text-xs tracking-widest text-red-500 mb-4">// PAY-AS-YOU-GO</div>
              <div className="font-display text-6xl sm:text-7xl md:text-8xl mb-2 leading-none">
                $15<span className="text-xl sm:text-2xl md:text-3xl text-stone-400 font-mono">/post</span>
              </div>
              <p className="text-stone-300 mb-2">One post equals one calendar day at your venue. Show as many games as you want that day, same price.</p>
              <p className="text-stone-500 text-sm mb-8 font-mono">Hosting another day? That is another $15 post. No subscriptions.</p>

              <div className="grid grid-cols-2 gap-3 md:gap-4 text-left mb-8 max-w-md mx-auto">
                {['Unlimited games per day', 'Vibe and amenity tags', 'Map and zip search', 'Ticket / RSVP link', 'Capacity counter', 'Phone CTA', 'Cover charge display', 'Shareable event page'].map((f, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-stone-200">{f}</span>
                  </div>
                ))}
              </div>

              <Link href="/host" className="bg-red-600 text-stone-50 px-6 md:px-8 py-3 md:py-4 font-headline text-xl md:text-2xl hover:bg-stone-50 hover:text-stone-900 transition inline-block">
                POST YOUR MATCHDAY
              </Link>
              <div className="font-mono text-xs text-stone-500 mt-6">
                We keep it low on purpose. The Cup is a 5-week window. Fill the map, fill your venue.
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3 mt-3">
              <div className="border-2 border-amber-500 bg-stone-900 p-5">
                <div className="flex items-start gap-3">
                  <Star className="w-6 h-6 text-amber-500 fill-amber-500 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-display text-lg text-stone-50">FEATURED PLACEMENT</div>
                      <div className="font-mono text-sm bg-amber-500 text-stone-900 px-2 py-0.5 font-bold">+$10</div>
                    </div>
                    <p className="text-sm text-stone-300">Top of zip-code results. Gold badge. Fans see you first.</p>
                  </div>
                </div>
              </div>
              <div className="border-2 border-red-600 bg-stone-900 p-5">
                <div className="flex items-start gap-3">
                  <Trophy className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-display text-lg text-stone-50">FINAL DAY JULY 19</div>
                      <div className="font-mono text-sm bg-red-600 text-stone-50 px-2 py-0.5 font-bold">$30</div>
                    </div>
                    <p className="text-sm text-stone-300">The Final is the highest-demand day of the tournament. Priced accordingly.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between items-baseline border-b border-stone-700 pb-3 last:border-0 last:pb-0">
      <span className="font-mono text-xs text-stone-400 tracking-widest">{label}</span>
      <span className="font-display text-3xl text-stone-50">{value}</span>
    </div>
  )
}

function Problem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="border-2 border-stone-900 p-6 bg-white">
      <div className="text-red-600 mb-4">{icon}</div>
      <div className="font-display text-2xl mb-2">{title}</div>
      <p className="text-stone-600 text-sm">{desc}</p>
    </div>
  )
}

function Card({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="border-2 border-stone-800 p-6 bg-stone-900/30 hover:border-red-600 transition">
      <div className="font-mono text-xs tracking-widest text-red-500 mb-3">{num}</div>
      <div className="font-display text-2xl mb-2">{title}</div>
      <p className="text-stone-400 text-sm">{desc}</p>
    </div>
  )
}