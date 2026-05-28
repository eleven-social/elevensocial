'use client'

import { useState } from 'react'

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
    return { label: 'Fan Festival', color: 'bg-zinc-700' }
  }

  return (
    <>
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Find Watch Parties</h1>
        <p className="text-zinc-400 text-lg mb-8">
          {filtered.length} events{' '}
          {country !== 'All' ? `in ${country.replace('USA', 'the USA')}` : 'across 3 countries'}
        </p>

        {/* Country buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          {countries.map((c) => (
            <button
              key={c.key}
              onClick={() => setCountry(c.key)}
              