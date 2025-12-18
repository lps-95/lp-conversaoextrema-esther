import React from 'react';

// Animated gradient mesh background
export function MeshGradient({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <div className='absolute inset-0 bg-gradient-to-br from-button-primary/20 via-accent-gold/10 to-transparent animate-pulse-subtle opacity-60' />
      <div className='absolute top-0 right-0 w-96 h-96 bg-button-primary/30 rounded-full blur-[120px] animate-float-slow' />
      <div className='absolute bottom-0 left-0 w-96 h-96 bg-accent-gold/20 rounded-full blur-[100px] animate-float-slow' style={{ animationDelay: '2s' }} />
    </div>
  )
}

// Animated dots pattern
export function DotsPattern({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <svg className='w-full h-full opacity-20' xmlns='http://www.w3.org/2000/svg'>
        <defs>
          <pattern id='dots' x='0' y='0' width='40' height='40' patternUnits='userSpaceOnUse'>
            <circle cx='2' cy='2' r='1' fill='currentColor' className='text-button-primary' />
          </pattern>
        </defs>
        <rect width='100%' height='100%' fill='url(#dots)' />
      </svg>
    </div>
  )
}

// Glowing orb
export function GlowOrb({ className = '', color = 'primary' }: { className?: string; color?: 'primary' | 'gold' | 'white' }) {
  const colors = {
    primary: 'bg-button-primary',
    gold: 'bg-accent-gold',
    white: 'bg-white'
  }

  return (
    <div className={`absolute ${colors[color]}/30 rounded-full blur-3xl animate-pulse-glow ${className}`} />
  )
}

// Grid pattern
export function GridPattern({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <svg className='w-full h-full opacity-10' xmlns='http://www.w3.org/2000/svg'>
        <defs>
          <pattern id='grid' x='0' y='0' width='50' height='50' patternUnits='userSpaceOnUse'>
            <path d='M 50 0 L 0 0 0 50' fill='none' stroke='currentColor' strokeWidth='0.5' className='text-button-primary' />
          </pattern>
        </defs>
        <rect width='100%' height='100%' fill='url(#grid)' />
      </svg>
    </div>
  )
}

// Floating particles
export function FloatingParticles({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className='absolute w-1 h-1 bg-button-primary/40 rounded-full'
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float-particle ${5 + Math.random() * 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
    </div>
  )
}

// Animated border gradient
export function AnimatedBorder({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`relative ${className}`}>
      <div className='absolute -inset-0.5 bg-gradient-to-r from-button-primary via-accent-gold to-button-primary rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-1000 animate-gradient-x' />
      <div className='relative'>{children}</div>
    </div>
  )
}
