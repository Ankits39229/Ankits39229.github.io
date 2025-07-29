'use client'

import { useEffect } from 'react'

export default function StagewiseProvider() {
  useEffect(() => {
    // Only initialize in development mode
    if (process.env.NODE_ENV === 'development') {
      try {
        // Dynamic import to avoid SSR issues
        import('@stagewise/toolbar').then(({ initToolbar }) => {
          initToolbar({
            plugins: []
          })
          console.log('Stagewise toolbar initialized successfully')
        }).catch((error) => {
          console.warn('Failed to load Stagewise toolbar:', error)
        })
      } catch (error) {
        console.warn('Failed to initialize Stagewise toolbar:', error)
      }
    }
  }, [])

  // This component doesn't render anything
  return null
}
