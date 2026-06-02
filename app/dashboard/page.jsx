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
  FileText,
  ClipboardList,
  CheckSquare,
  AlertCircle,
  Calendar,
  Truck,
} from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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

const tabbedCasesData = {
  ordersReceivedToday: [
    {
      id: "ORD-2026-001",
      clinic: "Doha Dental Center",
      milling: "In-House Milling A",
      dentist: "Dr. Sarah Al-Thani",
      technician: "Tech. John Doe",
      patient: "Fatima Al-Kuwari",
      externalLab: "Gulf Premium Lab",
      status: "Received",
      statusType: "received"
    },
    {
      id: "ORD-2026-002",
      clinic: "West Bay Orthodontics",
      milling: "In-House Milling B",
      dentist: "Dr. Marcus Vance",
      technician: "Tech. Sarah Connor",
      patient: "Hamad Al-Marri",
      externalLab: "Apex Dental Arts",
      status: "In Design Queue",
      statusType: "pending"
    }
  ],
  ordersDeliveredToday: [
    {
      id: "ORD-2026-095",
      clinic: "Al-Ahli Dental",
      milling: "In-House Milling B",
      dentist: "Dr. Kareem Ahmed",
      technician: "Tech. David Chen",
      patient: "Mariam Al-Baker",
      externalLab: "None (In-House)",
      status: "Ready for Delivery",
      statusType: "ready"
    },
    {
      id: "ORD-2026-088",
      clinic: "Elite Medical Center",
      milling: "Speed Milling Qatar",
      dentist: "Dr. Elena Rostova",
      technician: "Tech. Michael Scott",
      patient: "Abdulrahman Al-Thani",
      externalLab: "Modern Tech Lab",
      status: "Out for Delivery",
      statusType: "transit"
    }
  ],
  activeCases: [
    {
      id: "ORD-2026-112",
      clinic: "Pearl Dental Studio",
      milling: "Milling C",
      dentist: "Dr. Faisal Rashid",
      technician: "Tech. Alice Wong",
      patient: "Nasser Al-Suwaidi",
      externalLab: "Precision Dental",
      status: "Designing",
      statusType: "in-progress"
    },
    {
      id: "ORD-2026-105",
      clinic: "Royal Clinic",
      milling: "Milling A",
      dentist: "Dr. Aisha Al-Jaber",
      technician: "Tech. Robert Downey",
      patient: "Salma Al-Naimi",
      externalLab: "Star Laboratory",
      status: "Milling",
      statusType: "in-progress"
    }
  ],
  fittingsCreatedToday: [
    {
      id: "FIT-2026-015",
      clinic: "Aspetar Clinic",
      milling: "3D Print Lab 1",
      dentist: "Dr. Khaled Abdulla",
      technician: "Tech. Bruce Wayne",
      patient: "Jassim Al-Sada",
      externalLab: "None",
      status: "Fitting Fabricated",
      statusType: "ready"
    },
    {
      id: "FIT-2026-022",
      clinic: "Al Khor Dental",
      milling: "In-House Milling A",
      dentist: "Dr. Mona Al-Kubaisi",
      technician: "Tech. Peter Parker",
      patient: "Dana Al-Mulla",
      externalLab: "Crown Arts Lab",
      status: "Design Approved",
      statusType: "in-progress"
    }
  ],
  fittingsDeliveredToday: [
    {
      id: "FIT-2026-009",
      clinic: "Qatar Ortho Clinic",
      milling: "In-House 3D Print",
      dentist: "Dr. Yousef Al-Harami",
      technician: "Tech. Clark Kent",
      patient: "Abdullah Al-Sulaiti",
      externalLab: "OrthoTech Labs",
      status: "Quality Checked",
      statusType: "ready"
    },
    {
      id: "FIT-2026-004",
      clinic: "Doha Premium Dentistry",
      milling: "In-House Milling B",
      dentist: "Dr. Layla Al-Masri",
      technician: "Tech. Diana Prince",
      patient: "Hassan Al-Jefairi",
      externalLab: "None",
      status: "Ready for Pickup",
      statusType: "ready"
    }
  ],
  ordersPastDue: [
    {
      id: "ORD-2026-077",
      clinic: "West Bay Dental Clinic",
      milling: "External Milling A",
      dentist: "Dr. Jean-Pierre",
      technician: "Tech. Logan Howlett",
      patient: "Saad Al-Khalfan",
      externalLab: "Elite Dental Lab",
      status: "Delayed - Material",
      statusType: "alert"
    },
    {
      id: "ORD-2026-065",
      clinic: "Lusail Smile Center",
      milling: "Milling B",
      dentist: "Dr. Noora Al-Subaey",
      technician: "Tech. Tony Stark",
      patient: "Lulwa Al-Sowaidi",
      externalLab: "Vinci Lab",
      status: "Delayed - Revision",
      statusType: "alert"
    }
  ],
  fittingsPastDue: [
    {
      id: "FIT-2026-001",
      clinic: "Smile Signature",
      milling: "3D Print Lab 2",
      dentist: "Dr. George Clooney",
      technician: "Tech. Steve Rogers",
      patient: "Fahad Al-Marzooqi",
      externalLab: "Signature Lab",
      status: "Delayed - Adjustment",
      statusType: "alert"
    },
    {
      id: "FIT-2026-003",
      clinic: "Wakra Dental",
      milling: "In-House Milling A",
      dentist: "Dr. Yasmin Al-Ansari",
      technician: "Tech. Natasha Romanoff",
      patient: "Sara Al-Khori",
      externalLab: "None",
      status: "Delayed - Backlog",
      statusType: "alert"
    }
  ],
  drivers: [
    {
      id: "DRV-2026-001",
      clinic: "Al-Ahli Dental Clinic",
      milling: "Route A - Driver: Bilal Khalid",
      dentist: "Dr. Kareem Ahmed",
      technician: "Tech. David Chen",
      patient: "Mariam Al-Baker",
      externalLab: "Modern Tech Lab",
      status: "Out for Delivery",
      statusType: "transit"
    },
    {
      id: "DRV-2026-002",
      clinic: "Pearl Dental Studio",
      milling: "Route B - Driver: Yousuf Khan",
      dentist: "Dr. Faisal Rashid",
      technician: "Tech. Alice Wong",
      patient: "Nasser Al-Suwaidi",
      externalLab: "None (In-House)",
      status: "Delivered",
      statusType: "ready"
    },
    {
      id: "DRV-2026-003",
      clinic: "West Bay Orthodontics",
      milling: "Route C - Driver: Bilal Khalid",
      dentist: "Dr. Marcus Vance",
      technician: "Tech. Sarah Connor",
      patient: "Hamad Al-Marri",
      externalLab: "Apex Dental Arts",
      status: "Scheduled",
      statusType: "pending"
    }
  ]
}

const calendarEvents = {
  6: {
    title: "jasmine demo (095954Q4E5)",
    clinic: "Academy Clinic - ceyda",
    type: "blue"
  },
  8: {
    title: "Glaze (demo patient)",
    clinic: "Academy Clinic - MARY MARY",
    type: "red",
    highlightCell: true
  },
  2: {
    title: "ORD-2026-001 (Fatima)",
    clinic: "Doha Dental - In-House A",
    type: "emerald"
  },
  12: {
    title: "FIT-2026-015 (Jassim)",
    clinic: "Aspetar Clinic - Print Lab 1",
    type: "purple"
  },
  18: {
    title: "ORD-2026-077 (Saad)",
    clinic: "West Bay - External Lab A",
    type: "orange"
  },
  22: {
    title: "FIT-2026-009 (Abdullah)",
    clinic: "Qatar Ortho - 3D Print",
    type: "cyan"
  }
}

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

const tabNames = {
  ordersReceivedToday: "Orders Received Today",
  ordersDeliveredToday: "Orders to be Delivered Today",
  activeCases: "Active Cases",
  fittingsCreatedToday: "Fittings Created Today",
  fittingsDeliveredToday: "Fittings to Be Delivered Today",
  ordersPastDue: "Orders with Past Delivery Date",
  fittingsPastDue: "Fittings with Past Delivery Date",
  drivers: "Drivers"
}

function DashboardPage() {
  const [mounted, setMounted] = React.useState(false)
  const [dateRange, setDateRange] = React.useState({ from: undefined, to: undefined })
  const [casesData, setCasesData] = React.useState(tabbedCasesData)

  const handleMoveRow = (rowId, sourceTab, targetTab) => {
    if (sourceTab === targetTab) return

    setCasesData(prev => {
      const sourceList = prev[sourceTab] || []
      const targetList = prev[targetTab] || []
      const itemToMove = sourceList.find(item => item.id === rowId)
      
      if (!itemToMove) return prev

      let updatedStatus = itemToMove.status
      let updatedStatusType = itemToMove.statusType

      if (targetTab === "ordersReceivedToday") {
        updatedStatus = "Received"
        updatedStatusType = "received"
      } else if (targetTab === "ordersDeliveredToday") {
        updatedStatus = "Out for Delivery"
        updatedStatusType = "transit"
      } else if (targetTab === "activeCases") {
        updatedStatus = "Milling"
        updatedStatusType = "in-progress"
      } else if (targetTab === "fittingsCreatedToday") {
        updatedStatus = "Fitting Fabricated"
        updatedStatusType = "ready"
      } else if (targetTab === "fittingsDeliveredToday") {
        updatedStatus = "Ready for Pickup"
        updatedStatusType = "ready"
      } else if (targetTab === "ordersPastDue") {
        updatedStatus = "Delayed - Material"
        updatedStatusType = "alert"
      } else if (targetTab === "fittingsPastDue") {
        updatedStatus = "Delayed - Adjustment"
        updatedStatusType = "alert"
      } else if (targetTab === "drivers") {
        updatedStatus = "Out for Delivery"
        updatedStatusType = "transit"
      }

      const updatedItem = {
        ...itemToMove,
        status: updatedStatus,
        statusType: updatedStatusType
      }

      return {
        ...prev,
        [sourceTab]: sourceList.filter(item => item.id !== rowId),
        [targetTab]: [updatedItem, ...targetList]
      }
    })
  }

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

      {/* Dental & Operations Status in below  */}
      <Card className="shadow-sm border border-border overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-semibold text-main flex items-center gap-2">
                <ClipboardList className="h-5 w-5" /> Operations Tracking
              </CardTitle>
              <CardDescription>
                Real-time operational status of orders and fittings • Assign to other departments dynamically
              </CardDescription>
            </div>
            <div className="text-xs text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-lg border flex items-center gap-1.5 self-start md:self-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Live Syncing
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="ordersReceivedToday" className="w-full">
            <div className="px-6 border-b border-border bg-muted/20">
              <TabsList className="flex flex-wrap w-full justify-start border-none bg-transparent p-0 h-auto rounded-none gap-x-6 gap-y-2 py-2">
                <TabsTrigger 
                  value="ordersReceivedToday" 
                  className="pb-3 pt-2.5 px-1 rounded-none border-b-2 border-transparent data-[state=active]:border-main data-[state=active]:bg-transparent data-[state=active]:text-main data-[state=active]:shadow-none text-muted-foreground font-medium text-sm hover:text-foreground transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 relative"
                >
                  <FileText className="h-4 w-4" />
                  <span>Orders Received Today</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-main/10 text-main">
                    {casesData.ordersReceivedToday.length}
                  </span>
                </TabsTrigger>
                <TabsTrigger 
                  value="ordersDeliveredToday" 
                  className="pb-3 pt-2.5 px-1 rounded-none border-b-2 border-transparent data-[state=active]:border-main data-[state=active]:bg-transparent data-[state=active]:text-main data-[state=active]:shadow-none text-muted-foreground font-medium text-sm hover:text-foreground transition-all whitespace-nowrap cursor-pointer flex items-center gap-2"
                >
                  <Truck className="h-4 w-4" />
                  <span>Orders to be Delivered Today</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-main/10 text-main">
                    {casesData.ordersDeliveredToday.length}
                  </span>
                </TabsTrigger>
                <TabsTrigger 
                  value="activeCases" 
                  className="pb-3 pt-2.5 px-1 rounded-none border-b-2 border-transparent data-[state=active]:border-main data-[state=active]:bg-transparent data-[state=active]:text-main data-[state=active]:shadow-none text-muted-foreground font-medium text-sm hover:text-foreground transition-all whitespace-nowrap cursor-pointer flex items-center gap-2"
                >
                  <Activity className="h-4 w-4" />
                  <span>Active Cases</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-main/10 text-main">
                    {casesData.activeCases.length}
                  </span>
                </TabsTrigger>
                <TabsTrigger 
                  value="fittingsCreatedToday" 
                  className="pb-3 pt-2.5 px-1 rounded-none border-b-2 border-transparent data-[state=active]:border-main data-[state=active]:bg-transparent data-[state=active]:text-main data-[state=active]:shadow-none text-muted-foreground font-medium text-sm hover:text-foreground transition-all whitespace-nowrap cursor-pointer flex items-center gap-2"
                >
                  <CheckSquare className="h-4 w-4" />
                  <span>Fittings Created Today</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-main/10 text-main">
                    {casesData.fittingsCreatedToday.length}
                  </span>
                </TabsTrigger>
                <TabsTrigger 
                  value="fittingsDeliveredToday" 
                  className="pb-3 pt-2.5 px-1 rounded-none border-b-2 border-transparent data-[state=active]:border-main data-[state=active]:bg-transparent data-[state=active]:text-main data-[state=active]:shadow-none text-muted-foreground font-medium text-sm hover:text-foreground transition-all whitespace-nowrap cursor-pointer flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Fittings to Be Delivered Today</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-main/10 text-main">
                    {casesData.fittingsDeliveredToday.length}
                  </span>
                </TabsTrigger>
                <TabsTrigger 
                  value="ordersPastDue" 
                  className="pb-3 pt-2.5 px-1 rounded-none border-b-2 border-transparent data-[state=active]:border-rose-500 data-[state=active]:bg-transparent data-[state=active]:text-rose-600 data-[state=active]:shadow-none text-muted-foreground font-medium text-sm hover:text-rose-500 transition-all whitespace-nowrap cursor-pointer flex items-center gap-2"
                >
                  <AlertCircle className="h-4 w-4 text-rose-500" />
                  <span>Orders with Past Delivery Date</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400">
                    {casesData.ordersPastDue.length}
                  </span>
                </TabsTrigger>
                <TabsTrigger 
                  value="fittingsPastDue" 
                  className="pb-3 pt-2.5 px-1 rounded-none border-b-2 border-transparent data-[state=active]:border-rose-500 data-[state=active]:bg-transparent data-[state=active]:text-rose-600 data-[state=active]:shadow-none text-muted-foreground font-medium text-sm hover:text-rose-500 transition-all whitespace-nowrap cursor-pointer flex items-center gap-2"
                >
                  <AlertCircle className="h-4 w-4 text-rose-500" />
                  <span>Fittings with Past Delivery Date</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400">
                    {casesData.fittingsPastDue.length}
                  </span>
                </TabsTrigger>
                <TabsTrigger 
                  value="drivers" 
                  className="pb-3 pt-2.5 px-1 rounded-none border-b-2 border-transparent data-[state=active]:border-main data-[state=active]:bg-transparent data-[state=active]:text-main data-[state=active]:shadow-none text-muted-foreground font-medium text-sm hover:text-foreground transition-all whitespace-nowrap cursor-pointer flex items-center gap-2"
                >
                  <Truck className="h-4 w-4" />
                  <span>Drivers</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-main/10 text-main">
                    {casesData.drivers.length}
                  </span>
                </TabsTrigger>
              </TabsList>
            </div>

            {Object.entries(casesData).map(([tabKey, rows]) => (
              <TabsContent key={tabKey} value={tabKey} className="m-0 border-none outline-none">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-muted/40">
                      <TableRow>
                        <TableHead className="pl-6 py-3 font-semibold text-foreground text-xs uppercase tracking-wider">Clinic / Milling</TableHead>
                        <TableHead className="py-3 font-semibold text-foreground text-xs uppercase tracking-wider">Dentist / Technician</TableHead>
                        <TableHead className="py-3 font-semibold text-foreground text-xs uppercase tracking-wider">Patient</TableHead>
                        <TableHead className="py-3 font-semibold text-foreground text-xs uppercase tracking-wider">External Laboratory</TableHead>
                        <TableHead className="py-3 font-semibold text-foreground text-xs uppercase tracking-wider">Assign Department</TableHead>
                        <TableHead className="pr-6 py-3 text-right font-semibold text-foreground text-xs uppercase tracking-wider">Order Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rows.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                            No cases found in this category.
                          </TableCell>
                        </TableRow>
                      ) : (
                        rows.map((row) => (
                          <TableRow key={row.id} className="hover:bg-muted/30 transition-colors">
                            <TableCell className="pl-6 py-4">
                              <div className="font-medium text-sm text-foreground">{row.clinic}</div>
                              <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40"></span>
                                {row.milling}
                              </div>
                            </TableCell>
                            <TableCell className="py-4">
                              <div className="font-medium text-sm text-foreground">{row.dentist}</div>
                              <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40"></span>
                                {row.technician}
                              </div>
                            </TableCell>
                            <TableCell className="py-4">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6 text-[10px]">
                                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${row.patient}`} alt={row.patient} />
                                  <AvatarFallback>{row.patient.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium text-foreground">{row.patient}</span>
                              </div>
                            </TableCell>
                            <TableCell className="py-4">
                              <span className="text-sm text-foreground">{row.externalLab}</span>
                            </TableCell>
                            <TableCell className="py-4">
                              <select
                                value={tabKey}
                                onChange={(e) => handleMoveRow(row.id, tabKey, e.target.value)}
                                className="text-xs bg-background hover:bg-muted text-foreground border border-input rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-main cursor-pointer font-medium transition-all max-w-[180px]"
                              >
                                {Object.entries(tabNames).map(([key, label]) => (
                                  <option key={key} value={key}>
                                    {label}
                                  </option>
                                ))}
                              </select>
                            </TableCell>
                            <TableCell className="pr-6 py-4 text-right">
                              <span className={cn(
                                "text-xs font-semibold px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5",
                                row.statusType === "received" && "bg-blue-50 text-blue-700 border-blue-200/50 dark:bg-blue-900/30 dark:text-blue-400",
                                row.statusType === "pending" && "bg-amber-50 text-amber-700 border-amber-200/50 dark:bg-amber-900/30 dark:text-amber-400",
                                row.statusType === "in-progress" && "bg-indigo-50 text-indigo-700 border-indigo-200/50 dark:bg-indigo-900/30 dark:text-indigo-400",
                                row.statusType === "ready" && "bg-emerald-50 text-emerald-700 border-emerald-200/50 dark:bg-emerald-900/30 dark:text-emerald-400",
                                row.statusType === "transit" && "bg-teal-50 text-teal-700 border-teal-200/50 dark:bg-teal-900/30 dark:text-teal-400",
                                row.statusType === "alert" && "bg-rose-50 text-rose-700 border-rose-200/50 dark:bg-rose-900/30 dark:text-rose-400"
                              )}>
                                <span className={cn(
                                  "w-1.5 h-1.5 rounded-full",
                                  row.statusType === "received" && "bg-blue-500",
                                  row.statusType === "pending" && "bg-amber-500",
                                  row.statusType === "in-progress" && "bg-indigo-500",
                                  row.statusType === "ready" && "bg-emerald-500",
                                  row.statusType === "transit" && "bg-teal-500",
                                  row.statusType === "alert" && "bg-rose-500"
                                )}></span>
                                {row.status}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Operations Calendar Section */}
      <Card className="shadow-sm border border-border overflow-hidden">
        <CardHeader className="pb-4 border-b border-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-semibold text-main flex items-center gap-2">
                <Calendar className="h-5 w-5" /> Operations Calendar
              </CardTitle>
              <CardDescription>
                Monthly view of scheduled cases and fitting deliverables
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="text-sm font-semibold bg-main/10 text-main px-3 py-1.5 rounded-lg border border-main/20">
                June 2026
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 border-b border-border bg-muted/40 text-center">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-r border-border last:border-r-0">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 bg-border gap-[1px]">
            {Array.from({ length: 35 }).map((_, index) => {
              // Sunday May 31 is index 0
              // June 1 is index 1
              // June 30 is index 30
              // July 1 is index 31
              let dayNumber = 0;
              let isCurrentMonth = false;
              let displayNum = "";

              if (index === 0) {
                isCurrentMonth = false;
                displayNum = "31"; // May 31
              } else if (index >= 1 && index <= 30) {
                isCurrentMonth = true;
                dayNumber = index;
                displayNum = index.toString();
              } else {
                isCurrentMonth = false;
                displayNum = (index - 30).toString(); // July 1, 2, 3, 4
              }

              const event = isCurrentMonth ? calendarEvents[dayNumber] : null;
              const isToday = isCurrentMonth && dayNumber === 2; // June 2 today

              return (
                <div 
                  key={index} 
                  className={cn(
                    "bg-background min-h-[120px] p-2 flex flex-col justify-between transition-colors relative hover:bg-muted/10",
                    !isCurrentMonth && "bg-muted/30 text-muted-foreground/50",
                    event?.highlightCell && "bg-emerald-50/70 dark:bg-emerald-950/20"
                  )}
                >
                  {/* Day Number and Badges */}
                  <div className="flex items-center justify-between mb-2">
                    <span 
                      className={cn(
                        "text-xs font-bold px-1.5 py-0.5 rounded-full",
                        isToday ? "bg-main text-white" : isCurrentMonth ? "text-foreground" : "text-muted-foreground/40"
                      )}
                    >
                      {displayNum}
                    </span>
                    {isToday && (
                      <span className="text-[9px] font-bold uppercase tracking-wider text-main bg-main/10 px-1 rounded-sm border border-main/20">
                        Today
                      </span>
                    )}
                  </div>

                  {/* Event Details */}
                  <div className="flex-1 flex flex-col justify-end">
                    {event && (
                      <div className="space-y-1">
                        <div 
                          className={cn(
                            "text-[10px] font-bold px-2 py-1 rounded shadow-sm text-white truncate block w-full",
                            event.type === "blue" && "bg-blue-600 dark:bg-blue-700",
                            event.type === "red" && "bg-rose-600 dark:bg-rose-700",
                            event.type === "emerald" && "bg-emerald-600 dark:bg-emerald-700",
                            event.type === "purple" && "bg-indigo-600 dark:bg-indigo-700",
                            event.type === "orange" && "bg-amber-600 dark:bg-amber-700",
                            event.type === "cyan" && "bg-teal-600 dark:bg-teal-700"
                          )}
                        >
                          {event.title}
                        </div>
                        <span className="text-[10px] text-muted-foreground font-medium block truncate px-0.5">
                          {event.clinic}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

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
