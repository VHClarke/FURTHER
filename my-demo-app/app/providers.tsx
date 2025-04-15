'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function RouteChangeTracker() {
  const pathname = usePathname()

  useEffect(() => {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'pageview',
      page: pathname,
    })
    console.log(`🔁 pageview pushed: ${pathname}`)
  }, [pathname])

  return null
}
