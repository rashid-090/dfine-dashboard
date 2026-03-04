"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"

export default function DashboardLayout({
  children,
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div 
          className={cn(
            "flex-1 flex flex-col transition-all duration-300 ease-in-out w-full",
            "md:pl-16 lg:pl-64"
          )}
        >
          {/* Header */}
          <Header />

          {/* Page Content */}
          <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
