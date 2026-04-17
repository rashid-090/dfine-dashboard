"use client"

import * as React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { useAuth } from "@/context/auth-context"
import { RoleRoute } from "@/context/protected-route"

export default function DashboardLayout({
  children,
}) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

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
            <RoleRoute>
              {children}
            </RoleRoute>
          </div>
        </div>
      </div>
    </div>
  )
}
