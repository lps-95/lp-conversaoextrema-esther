'use client'

import { useEffect } from 'react'

export default function useSmoothScroll() {
  useEffect(() => {
    // Detectar se é mobile - não usar smooth scroll em mobile Safari
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

    if (isMobile) {
      // Mobile: Desabilitar smooth scroll, usar scroll instant
      document.documentElement.style.scrollBehavior = 'auto'
      document.body.style.scrollBehavior = 'auto'
    } else {
      // Desktop: Usar smooth scroll
      document.documentElement.style.scrollBehavior = 'smooth'
      document.body.style.scrollBehavior = 'smooth'
    }

    // Handle all anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a')

      if (anchor?.hash) {
        const href = anchor.getAttribute('href')
        if (href?.startsWith('#')) {
          e.preventDefault()

          const targetElement = document.querySelector(href)
          if (targetElement) {
            // Mobile: instant scroll, Desktop: smooth scroll
            targetElement.scrollIntoView({
              behavior: isMobile ? 'auto' : 'smooth',
              block: 'start',
            })

            // Update URL without jumping
            if (href !== '#') {
              window.history.pushState(null, '', href)
            }
          }
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
    }
  }, [])
}
