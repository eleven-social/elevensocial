'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function EventsList({ events }: { events: any[] }) {
  const [country, setCountry] = useState('All')
  const [search, setSearch] = useState('')

  let filtered = events
  if (country !== 'All') {
    filtered = filtered.filter((e) => (e.country || 'USA') === country)
  }
  if (search.trim().length > 0) {
    const q = search.trim().toLowerCase()
    filtered = filtered.filter(
      (e) =>
        (e.city || '').toLowerCase().includes(q) ||
        (e.state || '').toLowerCase().includes(q) ||
        (e.name || '').toLowerCase().includes(q)
    )
  }

  const countries = [
    { key: 'All', label: 'All' },
    { key: 'USA', label: '🇺🇸 USA' },
    { key: 'Canada', label: '🇨🇦 Canada' },
    { key: 'Mexico', label: '🇲🇽 Mexico' },
  ]

  function typeBadge(type: string) {
    if (type === 'bar') return { label: 'Bar', color: 'bg-blue-600' }
    if (type === 'watch_party') return { label: 'Watch Party', color: 'bg-purple-600' }
    return { label: 'Fan Festival', color: 'bg-stone-700' }
  }

  return (
    <>
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <div className="font-mono text-xs tracking-[0.3em] text-red-500 mb-4">
          // FIND YOUR EVENT
        </div>
        <h1 className="font-display text-5xl md:text-7xl mb-3 leading-none">
          WATCH PARTIES
        </h1>
        <p className="text-stone-400 text-lg mb-8">
          {filtered.length} events{' '}
          {country !== 'All'
            ? `in ${country.replace('USA', 'the USA')}`
            : 'across 3 countries'}
        </p>

        <div className="flex flex-wrap gap-3 mb-6">
          {countries.map((c) => (
            <button
              key={c.key}
              onClick={() => setCountry(c.key)}
              className={`font-headline px-5 py-2 rounded-full text-sm transition ${
                country === c.key
                  ? 'bg-red-600 text-white'
                  : 'bg-stone-900 border border-stone-700 text-stone-300 hover:border-red-600'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by city or state (e.g. Seattle, TX, Miami)"
            className="w-full max-w-md bg-stone-900 border border-stone-700 rounded-lg px-4 py-3 text-white placeholder-stone-500 focus:border-red-600 focus:outline-none"
          />
          {search.trim().length > 0 && (
            <button
              onClick={() => setSearch('')}
              className="ml-3 font-mono text-sm text-stone-400 hover:text-white"
            >
              CLEAR
            </button>
          )}
        </div>
      </section>

      <section className="px-6 pb-16 max-w-6xl mx-auto">
        {filtered.length === 0 ? (
          <p className="text-stone-400">
            No events found for that search. Try a different city or country.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event: any) => {
              const badge = typeBadge(event.type)
              const isFree = !event.price_cents || event.price_cents === 0
              return (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  className="block bg-stone-900 border border-stone-800 rounded-2xl p-6 hover:border-red-600 transition"
                >
                  <div className="flex items-center gap-2 mb-3">
                    {isFree && (
                      <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                        FREE
                      </span>
                    )}
                    <span className={`${badge.color} text-white text-xs px-2 py-1 rounded`}>
                      {badge.label}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl mb-1 leading-tight">{event.name}</h3>
                  <p className="text-stone-400 text-sm mb-3">{event.venue_name}</p>
                  <p className="text-stone-300 text-sm mb-2">
                    {event.city}, {event.state}
                  </p>
                  <p className="text-stone-400 text-sm mb-4">{event.match_info}</p>
                  <p className="text-stone-500 text-sm mb-4 line-clamp-3">{event.description}</p>

                  <span className="font-headline inline-block text-red-500 text-sm">
                    VIEW DETAILS &rarr;
                  </span>
                </Link>
              )
            })}
          </div>
        )}
      </section>
    </>
  )
}
