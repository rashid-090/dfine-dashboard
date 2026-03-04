"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider
      {...props}
      forcedTheme="light"
      enableSystem={false}
      defaultTheme="light"
    >
      {children}
    </NextThemesProvider>
  )
}
