"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  TrendingUp,
  Users,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  ClipboardList,
  Stethoscope,
  Truck,
  AlertCircle,
} from "lucide-react"

// Sample data for each card type
const outstandingData = [
  { id: 1, name: "John Smith", amount: "$1,250.00", date: "2024-01-15" },
  { id: 2, name: "Sarah Johnson", amount: "$890.50", date: "2024-01-14" },
  { id: 3, name: "Mike Brown", amount: "$2,100.00", date: "2024-01-13" },
  { id: 4, name: "Emily Davis", amount: "$450.75", date: "2024-01-12" },
  { id: 5, name: "Robert Wilson", amount: "$1,680.25", date: "2024-01-11" },
]

const labOrderData = [
  { id: 1, patient: "John Smith", test: "Blood Test", status: "Pending", date: "2024-01-20" },
  { id: 2, patient: "Sarah Johnson", test: "MRI Scan", status: "Completed", date: "2024-01-19" },
  { id: 3, patient: "Mike Brown", test: "X-Ray", status: "In Progress", date: "2024-01-18" },
  { id: 4, patient: "Emily Davis", test: "CT Scan", status: "Pending", date: "2024-01-17" },
  { id: 5, patient: "Robert Wilson", test: "Ultrasound", status: "Completed", date: "2024-01-16" },
]

const doctorOrderData = [
  { id: 1, patient: "John Smith", prescription: "Amoxicillin 500mg", date: "2024-01-20" },
  { id: 2, patient: "Sarah Johnson", prescription: "Metformin 1000mg", date: "2024-01-19" },
  { id: 3, patient: "Mike Brown", prescription: "Lisinopril 10mg", date: "2024-01-18" },
  { id: 4, patient: "Emily Davis", prescription: "Atorvastatin 20mg", date: "2024-01-17" },
  { id: 5, patient: "Robert Wilson", prescription: "Omeprazole 20mg", date: "2024-01-16" },
]

const todayDeliveryData = [
  { id: 1, patient: "John Smith", item: "Medicines", address: "123 Main St", status: "Delivered" },
  { id: 2, patient: "Sarah Johnson", item: "Medical Report", address: "456 Oak Ave", status: "Out for Delivery" },
  { id: 3, patient: "Mike Brown", item: "Prescription Medicines", address: "789 Pine Rd", status: "Pending" },
  { id: 4, patient: "Emily Davis", item: "Lab Reports", address: "321 Elm St", status: "Delivered" },
  { id: 5, patient: "Robert Wilson", item: "Medical Equipment", address: "654 Maple Dr", status: "Out for Delivery" },
]

const expDeliveryData = [
  { id: 1, patient: "John Smith", item: "Insulin", urgency: "High", expectedDate: "2024-01-21" },
  { id: 2, patient: "Sarah Johnson", item: "Heart Medication", urgency: "High", expectedDate: "2024-01-21" },
  { id: 3, patient: "Mike Brown", item: "Painkillers", urgency: "Medium", expectedDate: "2024-01-22" },
  { id: 4, patient: "Emily Davis", item: "Antibiotics", urgency: "Medium", expectedDate: "2024-01-22" },
  { id: 5, patient: "Robert Wilson", item: "Vitamins", urgency: "Low", expectedDate: "2024-01-23" },
]

const subscriptionsData = [
  { id: 1, patient: "John Smith", plan: "Premium", amount: "$99.99/month", status: "Active" },
  { id: 2, patient: "Sarah Johnson", plan: "Basic", amount: "$49.99/month", status: "Active" },
  { id: 3, patient: "Mike Brown", plan: "Standard", amount: "$79.99/month", status: "Active" },
  { id: 4, patient: "Emily Davis", plan: "Premium", amount: "$99.99/month", status: "Expired" },
  { id: 5, patient: "Robert Wilson", plan: "Standard", amount: "$79.99/month", status: "Active" },
]

function StatCard({ title, value, change, changeType, icon: Icon, isOpen, onToggle }) {
  return (
    <Card className={cn("cursor-pointer transition-all hover:shadow-md", isOpen && "ring-2 ring-primary")} onClick={onToggle}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="flex items-center text-xs text-muted-foreground">
          {changeType === "positive" ? (
            <>
              <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">{change}</span>
            </>
          ) : (
            <>
              <ArrowDownRight className="mr-1 h-3 w-3 text-red-500" />
              <span className="text-red-500">{change}</span>
            </>
          )}
          <span className="ml-1">from last month</span>
        </p>
        
        {/* Show/Hide Button */}
        <Button
          variant={isOpen ? "default" : "outline"}
          size="sm"
          className="mt-3 w-full"
          onClick={(e) => {
            e.stopPropagation()
            onToggle()
          }}
        >
          <Eye className="mr-2 h-4 w-4" />
          {isOpen ? "Selected" : "Show Details"}
        </Button>
      </CardContent>
    </Card>
  )
}

function DetailsTable({ dataType, data }) {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>
          {dataType === "outstanding" && "Outstanding Details"}
          {dataType === "labOrder" && "Lab Orders Details"}
          {dataType === "doctorOrder" && "Doctor Orders Details"}
          {dataType === "todayDelivery" && "Today's Delivery Details"}
          {dataType === "expDelivery" && "Expected Delivery Details"}
          {dataType === "subscriptions" && "Subscriptions Details"}
        </CardTitle>
        <CardDescription>
          Showing {data.length} records
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="rounded-md border min-w-[600px]">
            <Table>
            <TableHeader>
              <TableRow>
                {dataType === "outstanding" && (
                  <>
                    <TableHead>Name</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                  </>
                )}
                {dataType === "labOrder" && (
                  <>
                    <TableHead>Patient</TableHead>
                    <TableHead>Test</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </>
                )}
                {dataType === "doctorOrder" && (
                  <>
                    <TableHead>Patient</TableHead>
                    <TableHead>Prescription</TableHead>
                    <TableHead>Date</TableHead>
                  </>
                )}
                {dataType === "todayDelivery" && (
                  <>
                    <TableHead>Patient</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Status</TableHead>
                  </>
                )}
                {dataType === "expDelivery" && (
                  <>
                    <TableHead>Patient</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Urgency</TableHead>
                    <TableHead>Expected Date</TableHead>
                  </>
                )}
                {dataType === "subscriptions" && (
                  <>
                    <TableHead>Patient</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  {dataType === "outstanding" && (
                    <>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.amount}</TableCell>
                      <TableCell>{item.date}</TableCell>
                    </>
                  )}
                  {dataType === "labOrder" && (
                    <>
                      <TableCell className="font-medium">{item.patient}</TableCell>
                      <TableCell>{item.test}</TableCell>
                      <TableCell>
                        <span className={cn(
                          "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                          item.status === "Completed" && "bg-green-100 text-green-800",
                          item.status === "In Progress" && "bg-blue-100 text-blue-800",
                          item.status === "Pending" && "bg-yellow-100 text-yellow-800"
                        )}>
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell>{item.date}</TableCell>
                    </>
                  )}
                  {dataType === "doctorOrder" && (
                    <>
                      <TableCell className="font-medium">{item.patient}</TableCell>
                      <TableCell>{item.prescription}</TableCell>
                      <TableCell>{item.date}</TableCell>
                    </>
                  )}
                  {dataType === "todayDelivery" && (
                    <>
                      <TableCell className="font-medium">{item.patient}</TableCell>
                      <TableCell>{item.item}</TableCell>
                      <TableCell>{item.address}</TableCell>
                      <TableCell>
                        <span className={cn(
                          "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                          item.status === "Delivered" && "bg-green-100 text-green-800",
                          item.status === "Out for Delivery" && "bg-blue-100 text-blue-800",
                          item.status === "Pending" && "bg-yellow-100 text-yellow-800"
                        )}>
                          {item.status}
                        </span>
                      </TableCell>
                    </>
                  )}
                  {dataType === "expDelivery" && (
                    <>
                      <TableCell className="font-medium">{item.patient}</TableCell>
                      <TableCell>{item.item}</TableCell>
                      <TableCell>
                        <span className={cn(
                          "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                          item.urgency === "High" && "bg-red-100 text-red-800",
                          item.urgency === "Medium" && "bg-orange-100 text-orange-800",
                          item.urgency === "Low" && "bg-green-100 text-green-800"
                        )}>
                          {item.urgency}
                        </span>
                      </TableCell>
                      <TableCell>{item.expectedDate}</TableCell>
                    </>
                  )}
                  {dataType === "subscriptions" && (
                    <>
                      <TableCell className="font-medium">{item.patient}</TableCell>
                      <TableCell>{item.plan}</TableCell>
                      <TableCell>{item.amount}</TableCell>
                      <TableCell>
                        <span className={cn(
                          "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                          item.status === "Active" && "bg-green-100 text-green-800",
                          item.status === "Expired" && "bg-red-100 text-red-800"
                        )}>
                          {item.status}
                        </span>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        </div>
      </CardContent>
    </Card>
  )
}

function DashboardContent() {
  const [openCard, setOpenCard] = React.useState(null)
  const [dateRange, setDateRange] = React.useState({ from: undefined, to: undefined })
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    setDateRange({
      from: new Date(),
      to: new Date(),
    })
  }, [])

  const toggleCard = (cardTitle) => {
    setOpenCard(openCard === cardTitle ? null : cardTitle)
  }

  const getCurrentData = () => {
    switch (openCard) {
      case "Outstanding":
        return { type: "outstanding", data: outstandingData }
      case "Lab's Order":
        return { type: "labOrder", data: labOrderData }
      case "Doctor's Order":
        return { type: "doctorOrder", data: doctorOrderData }
      case "Today's Delivery":
        return { type: "todayDelivery", data: todayDeliveryData }
      case "Today Exp Delivery":
        return { type: "expDelivery", data: expDeliveryData }
      case "Subscriptions":
        return { type: "subscriptions", data: subscriptionsData }
      default:
        return null
    }
  }

  const currentData = getCurrentData()

  if (!mounted) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1,2,3,4,5,6].map(i => (
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

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Dashboard Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 gap-2">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <div className="hidden sm:block">
            <DateRangePicker
              date={dateRange}
              onDateChange={setDateRange}
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Outstanding"
          value="$5,371.50"
          change="+12.5%"
          changeType="positive"
          icon={ClipboardList}
          isOpen={openCard === "Outstanding"}
          onToggle={() => toggleCard("Outstanding")}
        />
        <StatCard
          title="Lab's Order"
          value="156"
          change="+8.2%"
          changeType="positive"
          icon={ClipboardList}
          isOpen={openCard === "Lab's Order"}
          onToggle={() => toggleCard("Lab's Order")}
        />
        <StatCard
          title="Doctor's Order"
          value="234"
          change="+15.3%"
          changeType="positive"
          icon={Stethoscope}
          isOpen={openCard === "Doctor's Order"}
          onToggle={() => toggleCard("Doctor's Order")}
        />
        <StatCard
          title="Today's Delivery"
          value="89"
          change="+5.7%"
          changeType="positive"
          icon={Truck}
          isOpen={openCard === "Today's Delivery"}
          onToggle={() => toggleCard("Today's Delivery")}
        />
        <StatCard
          title="Today Exp Delivery"
          value="23"
          change="-3.2%"
          changeType="negative"
          icon={AlertCircle}
          isOpen={openCard === "Today Exp Delivery"}
          onToggle={() => toggleCard("Today Exp Delivery")}
        />
        <StatCard
          title="Subscriptions"
          value="1,234"
          change="+25.1%"
          changeType="positive"
          icon={Users}
          isOpen={openCard === "Subscriptions"}
          onToggle={() => toggleCard("Subscriptions")}
        />
      </div>

      {/* Separate Details Section */}
      {currentData && (
        <DetailsTable dataType={currentData.type} data={currentData.data} />
      )}

      {/* Charts and Recent Activity */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        {/* Main Chart Card */}
        <Card className="col-span-1 md:col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>
              Your revenue and sales performance over time
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[200px] w-full flex items-center justify-center text-muted-foreground">
              Chart visualization would go here
            </div>
          </CardContent>
        </Card>

        {/* Recent Sales Card */}
        <Card className="col-span-1 md:col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>
              You made 265 sales this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="Avatar" />
                    <AvatarFallback>U{i}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">User {i}</p>
                    <p className="text-xs text-muted-foreground">user{i}@example.com</p>
                  </div>
                  <div className="ml-auto font-medium">+${["311.33", "978.36", "452.10", "821.50", "213.75"][i - 1]}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

    
      
    </div>
  )
}

export default function DashboardPage() {
  return (
    <DashboardContent />
  )
}
