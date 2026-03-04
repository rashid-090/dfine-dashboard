"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({ children, ...props }) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch by using a stable theme during SSR
  // The theme will be properly applied after client-side hydration
  return (
    <NextThemesProvider
      {...props}
      forcedTheme={mounted ? undefined : "light"}
    >
      {children}
    </NextThemesProvider>
  )
}
