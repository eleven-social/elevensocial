import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Eleven-Social — Every Match. Every Vibe.'

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0c0a09',
          backgroundImage:
            'linear-gradient(135deg, #0c0a09 0%, #1c1917 60%, #450a0a 100%)',
        }}
      >
        <div
          style={{
            width: 160,
            height: 160,
            borderRadius: '50%',
            backgroundColor: '#dc2626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <span style={{ fontSize: 90, color: 'white', fontWeight: 700 }}>
            11
          </span>
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            color: 'white',
            letterSpacing: -2,
            display: 'flex',
          }}
        >
          EVERY MATCH.
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            color: '#ef4444',
            letterSpacing: -2,
            display: 'flex',
            fontStyle: 'italic',
          }}
        >
          EVERY VIBE.
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#a8a29e',
            marginTop: 32,
            display: 'flex',
          }}
        >
          World Cup 2026 watch parties · USA · Canada · Mexico
        </div>
      </div>
    ),
    { ...size }
  )
}
