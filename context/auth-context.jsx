"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const AuthContext = createContext(null)

const USERS = {
  admin: { username: "admin", password: "admin", role: "admin", name: "Admin" },
  staff: { username: "staff", password: "staff", role: "staff", name: "Staff" },
  doctor: { username: "doctor", password: "doctor", role: "doctor", name: "Doctor" },
}

const ROLE_ROUTES = {
  admin: [
    "/dashboard",
    "/dashboard/definition",
    "/dashboard/work-flow-definition",
    "/dashboard/tax-master",
    "/dashboard/company-profile",
    "/dashboard/work-product",
    "/dashboard/vendor-details",
    "/dashboard/clinic-details",
    "/dashboard/rate-assignment",
    "/dashboard/staff-details",
    "/dashboard/order",
    "/dashboard/delivery-challan",
    "/dashboard/bills",
    "/dashboard/receipts",
    "/dashboard/stock",
  ],
  staff: [
    "/dashboard",
    "/dashboard/order",
    "/dashboard/delivery-challan",
    "/dashboard/bills",
    "/dashboard/receipts",
    "/dashboard/stock",
  ],
  doctor: [
    "/dashboard",
    "/dashboard/createOrder",
  ],
}

export function hasAccess(role, pathname) {
  const allowedRoutes = ROLE_ROUTES[role] || []
  return allowedRoutes.includes(pathname)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem("dfine_user")
    if (stored) {
      setUser(JSON.parse(stored))
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!isLoading && !user && typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  const login = (username, password) => {
    const foundUser = Object.values(USERS).find(
      (u) => u.username === username && u.password === password
    )
    if (foundUser) {
      const userData = { username: foundUser.username, role: foundUser.role, name: foundUser.name }
      setUser(userData)
      localStorage.setItem("dfine_user", JSON.stringify(userData))
      return { success: true, role: foundUser.role }
    }
    return { success: false, error: "Invalid credentials" }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("dfine_user")
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}

export function hasPermission(role, allowedRoles) {
  return allowedRoles.includes(role)
}