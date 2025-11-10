import React from 'react'

export default function StaticFallback() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#0f172a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '20px',
      boxSizing: 'border-box',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        maxWidth: '600px',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          backgroundColor: '#3b82f6',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          fontSize: '32px'
        }}>
          🚀
        </div>

        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          marginBottom: '16px',
          color: 'white'
        }}>
          NV's Portfolio
        </h1>

        <p style={{
          fontSize: '18px',
          color: '#94a3b8',
          marginBottom: '32px',
          lineHeight: '1.5'
        }}>
          Welcome! I'm a full-stack developer passionate about creating amazing digital experiences.
        </p>

        <div style={{
          backgroundColor: '#1e293b',
          border: '1px solid #334155',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '32px'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '12px',
            color: '#fbbf24'
          }}>
            Browser Compatibility Notice
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#94a3b8',
            marginBottom: '16px',
            lineHeight: '1.5'
          }}>
            Your current browser may have limitations with advanced 3D graphics.
            For the best experience, we recommend:
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <div style={{
              backgroundColor: '#065f46',
              padding: '12px',
              borderRadius: '8px',
              border: '2px solid #10b981'
            }}>
              <div style={{ fontSize: '18px', marginBottom: '4px', color: '#10b981' }}>✓ Brave Browser</div>
              <div style={{ fontSize: '14px', color: '#6ee7b7' }}>Works perfectly</div>
            </div>

            <div style={{
              backgroundColor: '#1e3a8a',
              padding: '12px',
              borderRadius: '8px',
              border: '2px solid #3b82f6'
            }}>
              <div style={{ fontSize: '18px', marginBottom: '4px', color: '#3b82f6' }}>→ Firefox</div>
              <div style={{ fontSize: '14px', color: '#93c5fd' }}>Excellent support</div>
            </div>

            <div style={{
              backgroundColor: '#7c2d12',
              padding: '12px',
              borderRadius: '8px',
              border: '2px solid #f97316'
            }}>
              <div style={{ fontSize: '18px', marginBottom: '4px', color: '#f97316' }}>⚙ Chrome</div>
              <div style={{ fontSize: '14px', color: '#fed7aa' }}>May need adjustments</div>
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <a
            href="https://brave.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: '#10b981',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '16px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            🦁 Download Brave
          </a>

          <button
            onClick={() => {
              console.log('Attempting to load 3D version...')
              window.location.hash = '#force-3d'
              window.location.reload()
            }}
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            🎮 Try 3D Version
          </button>
        </div>

        <div style={{
          marginTop: '32px',
          padding: '16px',
          backgroundColor: '#1e293b',
          borderRadius: '8px',
          border: '1px solid #334155'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: 'white' }}>
            📧 Get in Touch
          </h3>
          <div style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.5' }}>
            <div>📧 Email: contact@nvnv.app</div>
            <div>🔗 GitHub: github.com/nhatvu148</div>
            <div>💼 LinkedIn: linkedin.com/in/nhatvu148</div>
          </div>
        </div>
      </div>
    </div>
  )
}