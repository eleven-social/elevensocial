import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function EventsPage() {
  let events: any[] = []
  let debugInfo: string[] = []

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  debugInfo.push('URL exists: ' + (supabaseUrl ? 'YES' : 'NO'))
  debugInfo.push('URL value: ' + (supabaseUrl ? supabaseUrl.substring(0, 30) + '...' : 'MISSING'))
  debugInfo.push('Key exists: ' + (supabaseKey ? 'YES' : 'NO'))
  debugInfo.push('Key starts with: ' + (supabaseKey ? supabaseKey.substring(0, 10) + '...' : 'MISSING'))

  try {
    const { createClient } = await import('@supabase/supabase-js')
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey)
      const { data, error } = await supabase
        .from('events')
        .select('*')

      if (error) {
        debugInfo.push('Supabase error: ' + JSON.stringify(error))
      } else {
        debugInfo.push('Rows returned: ' + (data?.length || 0))
        events = data || []
      }
    } else {
      debugInfo.push('Skipped Supabase call - missing URL or key')
    }
  } catch (e: any) {
    debugInfo.push('Caught error: ' + (e?.message || String(e)))
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Events Debug</h1>
      <div className="bg-zinc-900 border border-yellow-500 p-6 rounded-lg mb-8 font-mono text-sm">
        <h2 className="text-yellow-400 mb-3 font-bold">DIAGNOSTIC INFO:</h2>
        {debugInfo.map((line, i) => (
          <div key={i} className="text-zinc-300 mb-1">→ {line}</div>
        ))}
      </div>
      <p className="text-zinc-400 mb-4">Events found: {events.length}</p>
      <Link href="/" className="text-red-500 underline">Back to home</Link>
    </div>
  )
}
