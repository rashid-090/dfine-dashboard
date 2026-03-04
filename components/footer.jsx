"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Heart, Github, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer({ className }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className={cn(
        "border-t bg-background py-3 px-6",
        className
      )}
    >
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        {/* Copyright */}
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <span>© {currentYear}</span>
          <span className="font-medium text-foreground">Dfine</span>
          <span>Dashboard</span>
          
        </div>

        

        {/* Links */}
        <div className="flex items-center gap-4 text-sm">
          <a
            href="http://dostudio.co.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Powered by Dostudio
          </a>
          
        </div>
      </div>
    </footer>
  )
}
