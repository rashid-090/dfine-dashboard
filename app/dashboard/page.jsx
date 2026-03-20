"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import {
  TrendingUp,
  TrendingDown,
  Users,
  Activity,
  DollarSign,
  ShoppingCart,
  Package,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"

// Sample data with QAR currency
const statsData = [
  {
    title: "Total Revenue",
    value: "QAR 125,430",
    change: "+12.5%",
    changeType: "positive",
    icon: DollarSign,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  {
    title: "Total Orders",
    value: "1,284",
    change: "+8.2%",
    changeType: "positive",
    icon: ShoppingCart,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Active Users",
    value: "3,456",
    change: "+15.3%",
    changeType: "positive",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "Pending Deliveries",
    value: "89",
    change: "-3.2%",
    changeType: "negative",
    icon: Package,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
]

const recentTransactions = [
  { id: 1, customer: "Ahmed Hassan", amount: "QAR 1,250.00", status: "Completed", date: "Today, 10:30 AM" },
  { id: 2, customer: "Fatima Al-Mohannadi", amount: "QAR 890.50", status: "Pending", date: "Today, 09:45 AM" },
  { id: 3, customer: "Khalid Rashid", amount: "QAR 2,100.00", status: "Completed", date: "Today, 09:15 AM" },
  { id: 4, customer: "Mariam Al-Kuwari", amount: "QAR 450.75", status: "Processing", date: "Yesterday" },
  { id: 5, customer: "Omar Youssef", amount: "QAR 1,680.25", status: "Completed", date: "Yesterday" },
]

const topProducts = [
  { id: 1, name: "Medical Supplies Kit", sales: 234, revenue: "QAR 35,100" },
  { id: 2, name: "Pharmaceutical Products", sales: 189, revenue: "QAR 28,350" },
  { id: 3, name: "Lab Equipment", sales: 156, revenue: "QAR 23,400" },
  { id: 4, name: "Health Supplements", sales: 128, revenue: "QAR 19,200" },
  { id: 5, name: "Medical Devices", sales: 97, revenue: "QAR 14,550" },
]

const activityLog = [
  { id: 1, action: "New order placed", user: "Ahmed Hassan", time: "2 min ago", type: "order" },
  { id: 2, action: "Payment received", user: "System", time: "15 min ago", type: "payment" },
  { id: 3, action: "Delivery completed", user: "Khalid Rashid", time: "1 hour ago", type: "delivery" },
  { id: 4, action: "New user registered", user: "Fatima Al-Mohannadi", time: "2 hours ago", type: "user" },
  { id: 5, action: "Order shipped", user: "System", time: "3 hours ago", type: "order" },
]

const monthlyData = [
  { month: "Jan", revenue: 45000, orders: 320 },
  { month: "Feb", revenue: 52000, orders: 380 },
  { month: "Mar", revenue: 48000, orders: 350 },
  { month: "Apr", revenue: 61000, orders: 420 },
  { month: "May", revenue: 55000, orders: 390 },
  { month: "Jun", revenue: 67000, orders: 480 },
]

function StatCard({ title, value, change, changeType, icon: Icon, color, bgColor }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className={cn("p-3 rounded-xl", bgColor)}>
            <Icon className={cn("h-6 w-6", color)} />
          </div>
          <div className={cn(
            "flex items-center text-sm font-medium px-2 py-1 rounded-full",
            changeType === "positive" ? "text-emerald-600 bg-emerald-100" : "text-red-600 bg-red-100"
          )}>
            {changeType === "positive" ? (
              <TrendingUp className="h-3 w-3 mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 mr-1" />
            )}
            {change}
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function DashboardPage() {
  const [mounted, setMounted] = React.useState(false)
  const [dateRange, setDateRange] = React.useState({ from: undefined, to: undefined })

  React.useEffect(() => {
    setMounted(true)
    // Set default date range to last 30 days
    const today = new Date()
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(today.getDate() - 30)
    setDateRange({ from: thirtyDaysAgo, to: today })
  }, [])

  const handleDateChange = (newDateRange) => {
    setDateRange(newDateRange)
    // Here you would filter data based on the date range
    console.log("Filtering data from:", newDateRange?.from, "to:", newDateRange?.to)
  }

  if (!mounted) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-2 text-main">Analytics Dashboard</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1,2,3,4].map(i => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Loading...</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">-</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue))

  // Format date range for display
  const formatDateRange = () => {
    if (!dateRange?.from) return "Select date range"
    const fromStr = dateRange.from.toLocaleDateString()
    const toStr = dateRange.to ? dateRange.to.toLocaleDateString() : "Present"
    return `${fromStr} - ${toStr}`
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 pt-6">
      {/* Header with Date Range Picker */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-2 text-main">Analytics Dashboard</h2>
          <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <DateRangePicker
            date={dateRange}
            onDateChange={handleDateChange}
          />
        </div>
      </div>

      {/* Date Range Display */}
      {dateRange?.from && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-2 rounded-lg">
          <Clock className="h-4 w-4" />
          <span>Showing data for: <span className="font-medium text-foreground">{formatDateRange()}</span></span>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts and Tables Row */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] flex items-end justify-between gap-2">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-main rounded-t-md transition-all hover:bg-mainhvr"
                    style={{ height: `${(data.revenue / maxRevenue) * 200}px` }}
                  />
                  <div className="text-xs text-muted-foreground">{data.month}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-sm text-muted-foreground">
              <span>Total: QAR 328,000</span>
              <span>Avg: QAR 54,667/month</span>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${transaction.customer}`} alt="Avatar" />
                      <AvatarFallback>{transaction.customer.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{transaction.customer}</p>
                      <p className="text-xs text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{transaction.amount}</p>
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full",
                      transaction.status === "Completed" && "bg-emerald-100 text-emerald-700",
                      transaction.status === "Pending" && "bg-yellow-100 text-yellow-700",
                      transaction.status === "Processing" && "bg-blue-100 text-blue-700"
                    )}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Best selling items this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-main/10 flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.sales} sales</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold">{product.revenue}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Log */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activityLog.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={cn(
                    "w-2 h-2 rounded-full mt-2",
                    activity.type === "order" && "bg-blue-500",
                    activity.type === "payment" && "bg-emerald-500",
                    activity.type === "delivery" && "bg-purple-500",
                    activity.type === "user" && "bg-orange-500"
                  )} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage
