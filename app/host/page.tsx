'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function HostPage() {
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot check - if filled, it's a bot
    if (data.get('website_url')) {
      setDone(true)
      return
    }

    const name = (data.get('name') as string)?.trim()
    const venue_name = (data.get('venue_name') as string)?.trim()
    const address = (data.get('address') as string)?.trim()
    const city = (data.get('city') as string)?.trim()
    const state = (data.get('state') as string)?.trim()
    const zip_code = (data.get('zip_code') as string)?.trim()
    const email = (data.get('email') as string)?.trim()
    const phone = (data.get('phone') as string)?.trim()
    const instagram = (data.get('instagram') as string)?.trim()
    const match_info = (data.get('match_info') as string)?.trim()
    const description = (data.get('description') as string)?.trim()
    const type = data.get('type') as string

    if (!name || !address || !city || !state || !zip_code || !email) {
      setError('Please fill in all required fields.')
      return
    }
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.')
      return
    }

    setSubmitting(true)

    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
      const supabaseKey = (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)!
      const supabase = createClient(supabaseUrl, supabaseKey)

      const { error: insertError } = await supabase.from('events').insert({
        type,
        name,
        venue_name,
        address,
        city,
        state,
        zip_code,
        email,
        phone,
        instagram,
        match_info,
        description,
        price_cents: 0,
        is_active: true,
      })

      if (insertError) {
        setError('Something went wrong. Please try again or email support@eleven-social.com')
        setSubmitting(false)
        return
      }

      setDone(true)
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="min-h-screen bg-stone-950 text-stone-50 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mx-auto mb-6">
            <span className="font-display text-3xl">11</span>
          </div>
          <h1 className="font-display text-4xl mb-4">YOU&apos;RE LISTED!</h1>
          <p className="text-stone-300 mb-8">
            Your venue is now live on Eleven-Social. Fans searching your city can find you. Check it out on the events page.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/events" className="bg-red-600 text-stone-50 px-6 py-3 font-headline text-lg hover:bg-stone-50 hover:text-stone-900 transition">
              SEE YOUR LISTING
            </Link>
            <Link href="/" className="text-stone-400 hover:text-white text-sm">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-50">
      <header className="border-b border-stone-800 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center font-display text-xl">
              11
            </div>
            <span className="font-display text-xl">ELEVEN-SOCIAL</span>
          </Link>
          <Link href="/events" className="text-sm text-stone-400 hover:text-white">
            Find Events
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="font-mono text-xs tracking-[0.3em] text-red-500 mb-4">// LIST YOUR VENUE</div>
        <h1 className="font-display text-4xl md:text-5xl mb-3">HOST A WATCH PARTY</h1>
        <p className="text-stone-300 mb-2">
          Free during launch. Get your venue in front of fans searching for World Cup watch parties.
        </p>
        <p className="text-stone-500 text-sm mb-10 font-mono">
          Listed instantly. Edit or remove anytime by emailing support@eleven-social.com
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Honeypot - hidden from humans */}
          <input
            type="text"
            name="website_url"
            tabIndex={-1}
            autoComplete="off"
            className="absolute opacity-0 pointer-events-none -z-10"
            aria-hidden="true"
          />

          <div>
            <label className="block font-headline text-sm mb-2">VENUE TYPE *</label>
            <select name="type" required className="w-full bg-stone-900 border border-stone-700 px-4 py-3 text-stone-50 focus:border-red-600 focus:outline-none">
              <option value="bar">Bar / Restaurant</option>
              <option value="watch_party">Watch Party / Rooftop / Club</option>
            </select>
          </div>

          <div>
            <label className="block font-headline text-sm mb-2">VENUE NAME *</label>
            <input name="name" required placeholder="e.g. The Football Factory" className="w-full bg-stone-900 border border-stone-700 px-4 py-3 text-stone-50 placeholder-stone-600 focus:border-red-600 focus:outline-none" />
          </div>

          <div>
            <label className="block font-headline text-sm mb-2">STREET ADDRESS *</label>
            <input name="address" required placeholder="e.g. 6 W 33rd St" className="w-full bg-stone-900 border border-stone-700 px-4 py-3 text-stone-50 placeholder-stone-600 focus:border-red-600 focus:outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-headline text-sm mb-2">CITY *</label>
              <input name="city" required placeholder="New York" className="w-full bg-stone-900 border border-stone-700 px-4 py-3 text-stone-50 placeholder-stone-600 focus:border-red-600 focus:outline-none" />
            </div>
            <div>
              <label className="block font-headline text-sm mb-2">STATE *</label>
              <input name="state" required placeholder="NY" maxLength={2} className="w-full bg-stone-900 border border-stone-700 px-4 py-3 text-stone-50 placeholder-stone-600 focus:border-red-600 focus:outline-none uppercase" />
            </div>
          </div>

          <div>
            <label className="block font-headline text-sm mb-2">ZIP CODE *</label>
            <input name="zip_code" required placeholder="10001" maxLength={5} className="w-full bg-stone-900 border border-stone-700 px-4 py-3 text-stone-50 placeholder-stone-600 focus:border-red-600 focus:outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-headline text-sm mb-2">EMAIL *</label>
              <input name="email" type="email" required placeholder="you@venue.com" className="w-full bg-stone-900 border border-stone-700 px-4 py-3 text-stone-50 placeholder-stone-600 focus:border-red-600 focus:outline-none" />
            </div>
            <div>
              <label className="block font-headline text-sm mb-2">PHONE</label>
              <input name="phone" placeholder="(212) 555-0100" className="w-full bg-stone-900 border border-stone-700 px-4 py-3 text-stone-50 placeholder-stone-600 focus:border-red-600 focus:outline-none" />
            </div>
          </div>

          <div>
            <label className="block font-headline text-sm mb-2">INSTAGRAM</label>
            <input name="instagram" placeholder="@yourvenue" className="w-full bg-stone-900 border border-stone-700 px-4 py-3 text-stone-50 placeholder-stone-600 focus:border-red-600 focus:outline-none" />
          </div>

          <div>
            <label className="block font-headline text-sm mb-2">WHAT ARE YOU SHOWING?</label>
            <input name="match_info" placeholder="e.g. All USA matches, opening day, the Final" className="w-full bg-stone-900 border border-stone-700 px-4 py-3 text-stone-50 placeholder-stone-600 focus:border-red-600 focus:outline-none" />
          </div>

          <div>
            <label className="block font-headline text-sm mb-2">DESCRIBE THE VIBE</label>
            <textarea name="description" rows={4} placeholder="Big screens, drink specials, outdoor patio, DJ after the match..." className="w-full bg-stone-900 border border-stone-700 px-4 py-3 text-stone-50 placeholder-stone-600 focus:border-red-600 focus:outline-none resize-none" />
          </div>

          {error && (
            <div className="bg-red-600/20 border border-red-600 px-4 py-3 text-red-300 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-red-600 text-stone-50 px-6 py-4 font-headline text-2xl hover:bg-stone-50 hover:text-stone-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'SUBMITTING...' : 'LIST MY VENUE — FREE'}
          </button>

          <p className="text-stone-600 text-xs text-center font-mono">
            By submitting, you confirm you represent this venue and the info is accurate.
          </p>
        </form>
      </div>
    </div>
  )
}
