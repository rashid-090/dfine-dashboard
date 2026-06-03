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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

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

const technicianData = [
  { id: 1, name: "Tech. John Doe", assigned: 15, completed: 32 },
  { id: 2, name: "Tech. Sarah Connor", assigned: 8, completed: 21 },
  { id: 3, name: "Tech. David Chen", assigned: 12, completed: 35 },
  { id: 4, name: "Tech. Alice Wong", assigned: 22, completed: 38 },
  { id: 5, name: "Tech. Michael Scott", assigned: 10, completed: 18 }
]

const topProducts = [
  { id: 1, name: "Medical Supplies Kit", sales: 234, revenue: "QAR 35,100" },
  { id: 2, name: "Pharmaceutical Products", sales: 189, revenue: "QAR 28,350" },
  { id: 3, name: "Lab Equipment", sales: 156, revenue: "QAR 23,400" },
  { id: 4, name: "Health Supplements", sales: 128, revenue: "QAR 19,200" },
  { id: 5, name: "Medical Devices", sales: 97, revenue: "QAR 14,550" },
]

const activityLog = [
  { id: 1, driver: "Bilal Khalid", route: "Route A - West Bay", status: "Products Dispatched", assigned: 15, pending: 5, delivered: 10, time: "10 mins ago" },
  { id: 2, driver: "Yousuf Khan", route: "Route B - Pearl Qatar", status: "Products Dispatched", assigned: 12, pending: 3, delivered: 9, time: "25 mins ago" },
  { id: 3, driver: "Khalid Rashid", route: "Route C - Al Khor", status: "Products Dispatched", assigned: 18, pending: 2, delivered: 16, time: "1 hour ago" },
  { id: 4, driver: "Ahmed Hassan", route: "Route D - Lusail", status: "Products Dispatched", assigned: 10, pending: 4, delivered: 6, time: "2 hours ago" },
  { id: 5, driver: "Fatima Al-Mohannadi", route: "Route E - Al Wakrah", status: "Products Dispatched", assigned: 14, pending: 1, delivered: 13, time: "3 hours ago" },
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
    { id: "PL-001", work: "Plaster", status: "Pending", no: "PL-101", activeCases: 15, finishedCases: 32 },
    { id: "AC-001", work: "Acrylic", status: "Finish", no: "AC-202", activeCases: 8, finishedCases: 21 },
    { id: "ZN-001", work: "Zincron", status: "Pending", no: "ZN-303", activeCases: 24, finishedCases: 50 },
    { id: "CD-001", work: "CAD", status: "Pending", no: "CD-404", activeCases: 19, finishedCases: 40 },
    { id: "CM-001", work: "CAM", status: "Finish", no: "CM-505", activeCases: 11, finishedCases: 29 }
  ],
  ordersDeliveredToday: [
    { id: "PL-002", work: "Plaster", status: "Finish", no: "PL-102", activeCases: 12, finishedCases: 35 },
    { id: "AC-002", work: "Acrylic", status: "Pending", no: "AC-203", activeCases: 10, finishedCases: 18 },
    { id: "ZN-002", work: "Zincron", status: "Finish", no: "ZN-304", activeCases: 20, finishedCases: 55 },
    { id: "CD-002", work: "CAD", status: "Pending", no: "CD-405", activeCases: 22, finishedCases: 38 },
    { id: "CM-002", work: "CAM", status: "Pending", no: "CM-506", activeCases: 14, finishedCases: 25 }
  ],
  activeCases: [
    { id: "PL-003", work: "Plaster", status: "Pending", no: "PL-103", activeCases: 9, finishedCases: 41 },
    { id: "AC-003", work: "Acrylic", status: "Pending", no: "AC-204", activeCases: 18, finishedCases: 30 },
    { id: "ZN-003", work: "Zincron", status: "Finish", no: "ZN-305", activeCases: 15, finishedCases: 48 },
    { id: "CD-003", work: "CAD", status: "Finish", no: "CD-406", activeCases: 17, finishedCases: 42 },
    { id: "CM-003", work: "CAM", status: "Pending", no: "CM-507", activeCases: 12, finishedCases: 31 }
  ],
  fittingsCreatedToday: [
    { id: "PL-004", work: "Plaster", status: "Finish", no: "PL-104", activeCases: 18, finishedCases: 28 },
    { id: "AC-004", work: "Acrylic", status: "Finish", no: "AC-205", activeCases: 11, finishedCases: 23 },
    { id: "ZN-004", work: "Zincron", status: "Pending", no: "ZN-306", activeCases: 26, finishedCases: 44 },
    { id: "CD-004", work: "CAD", status: "Pending", no: "CD-407", activeCases: 21, finishedCases: 36 },
    { id: "CM-004", work: "CAM", status: "Finish", no: "CM-508", activeCases: 10, finishedCases: 30 }
  ],
  fittingsDeliveredToday: [
    { id: "PL-005", work: "Plaster", status: "Finish", no: "PL-105", activeCases: 14, finishedCases: 34 },
    { id: "AC-005", work: "Acrylic", status: "Pending", no: "AC-206", activeCases: 13, finishedCases: 19 },
    { id: "ZN-005", work: "Zincron", status: "Finish", no: "ZN-307", activeCases: 22, finishedCases: 51 },
    { id: "CD-005", work: "CAD", status: "Finish", no: "CD-408", activeCases: 16, finishedCases: 44 },
    { id: "CM-005", work: "CAM", status: "Pending", no: "CM-509", activeCases: 8, finishedCases: 27 }
  ],
  ordersPastDue: [
    { id: "PL-006", work: "Plaster", status: "Pending", no: "PL-106", activeCases: 11, finishedCases: 29 },
    { id: "AC-006", work: "Acrylic", status: "Pending", no: "AC-207", activeCases: 12, finishedCases: 17 },
    { id: "ZN-006", work: "Zincron", status: "Pending", no: "ZN-308", activeCases: 28, finishedCases: 46 }
  ],
  fittingsPastDue: [
    { id: "CD-006", work: "CAD", status: "Pending", no: "CD-409", activeCases: 19, finishedCases: 39 },
    { id: "CM-006", work: "CAM", status: "Pending", no: "CM-510", activeCases: 15, finishedCases: 28 },
    { id: "PL-007", work: "Plaster", status: "Pending", no: "PL-107", activeCases: 8, finishedCases: 30 }
  ],
  drivers: [
    { id: "ZN-007", work: "Zincron", status: "Finish", no: "ZN-309", activeCases: 21, finishedCases: 49 },
    { id: "CD-007", work: "CAD", status: "Finish", no: "CD-410", activeCases: 18, finishedCases: 35 },
    { id: "CM-007", work: "CAM", status: "Pending", no: "CM-511", activeCases: 13, finishedCases: 24 }
  ]
}

const workDetailsCases = {
  Plaster: [
    { no: "PL-101", clinic: "Doha Dental Center", patient: "Fatima Al-Kuwari", dentist: "Dr. Sarah Al-Thani", technician: "Tech. John Doe", status: "Pending" },
    { no: "PL-102", clinic: "West Bay Ortho", patient: "Hamad Al-Marri", dentist: "Dr. Marcus Vance", technician: "Tech. Sarah Connor", status: "Finish" },
    { no: "PL-103", clinic: "Al-Ahli Dental", patient: "Mariam Al-Baker", dentist: "Dr. Kareem Ahmed", technician: "Tech. David Chen", status: "Pending" },
    { no: "PL-104", clinic: "Pearl Dental Studio", patient: "Nasser Al-Suwaidi", dentist: "Dr. Faisal Rashid", technician: "Tech. Alice Wong", status: "Finish" },
    { no: "PL-105", clinic: "Elite Medical Center", patient: "Abdulrahman Al-Thani", dentist: "Dr. Elena Rostova", technician: "Tech. Michael Scott", status: "Finish" },
    { no: "PL-106", clinic: "Royal Clinic", patient: "Salma Al-Naimi", dentist: "Dr. Aisha Al-Jaber", technician: "Tech. Robert Downey", status: "Pending" },
    { no: "PL-107", clinic: "Aspetar Clinic", patient: "Jassim Al-Sada", dentist: "Dr. Khaled Abdulla", technician: "Tech. Bruce Wayne", status: "Finish" },
    { no: "PL-108", clinic: "Al Khor Dental", patient: "Dana Al-Mulla", dentist: "Dr. Mona Al-Kubaisi", technician: "Tech. Peter Parker", status: "Pending" },
    { no: "PL-109", clinic: "Qatar Ortho Clinic", patient: "Abdullah Al-Sulaiti", dentist: "Dr. Yousef Al-Harami", technician: "Tech. Clark Kent", status: "Finish" },
    { no: "PL-110", clinic: "Doha Premium Dentistry", patient: "Hassan Al-Jefairi", dentist: "Dr. Layla Al-Masri", technician: "Tech. Diana Prince", status: "Finish" }
  ],
  Acrylic: [
    { no: "AC-201", clinic: "Smile Signature", patient: "Fahad Al-Marzooqi", dentist: "Dr. George Clooney", technician: "Tech. Steve Rogers", status: "Pending" },
    { no: "AC-202", clinic: "Wakra Dental", patient: "Sara Al-Khori", dentist: "Dr. Yasmin Al-Ansari", technician: "Tech. Natasha Romanoff", status: "Finish" },
    { no: "AC-203", clinic: "Doha Dental Center", patient: "Amina Al-Kuwari", dentist: "Dr. Sarah Al-Thani", technician: "Tech. John Doe", status: "Finish" },
    { no: "AC-204", clinic: "West Bay Ortho", patient: "Salem Al-Marri", dentist: "Dr. Marcus Vance", technician: "Tech. Sarah Connor", status: "Pending" },
    { no: "AC-205", clinic: "Al-Ahli Dental", patient: "Fatma Al-Baker", dentist: "Dr. Kareem Ahmed", technician: "Tech. David Chen", status: "Finish" },
    { no: "AC-206", clinic: "Pearl Dental Studio", patient: "Khalid Al-Suwaidi", dentist: "Dr. Faisal Rashid", technician: "Tech. Alice Wong", status: "Pending" },
    { no: "AC-207", clinic: "Elite Medical Center", patient: "Reem Al-Thani", dentist: "Dr. Elena Rostova", technician: "Tech. Michael Scott", status: "Finish" },
    { no: "AC-208", clinic: "Royal Clinic", patient: "Ahmed Al-Naimi", dentist: "Dr. Aisha Al-Jaber", technician: "Tech. Robert Downey", status: "Finish" },
    { no: "AC-209", clinic: "Aspetar Clinic", patient: "Faisal Al-Sada", dentist: "Dr. Khaled Abdulla", technician: "Tech. Bruce Wayne", status: "Pending" },
    { no: "AC-210", clinic: "Al Khor Dental", patient: "Noura Al-Mulla", dentist: "Dr. Mona Al-Kubaisi", technician: "Tech. Peter Parker", status: "Finish" }
  ],
  Zincron: [
    { no: "ZN-301", clinic: "Al-Ahli Dental", patient: "Ali Al-Baker", dentist: "Dr. Kareem Ahmed", technician: "Tech. David Chen", status: "Pending" },
    { no: "ZN-302", clinic: "Pearl Dental Studio", patient: "Dana Al-Suwaidi", dentist: "Dr. Faisal Rashid", technician: "Tech. Alice Wong", status: "Finish" },
    { no: "ZN-303", clinic: "Elite Medical Center", patient: "Mohammed Al-Thani", dentist: "Dr. Elena Rostova", technician: "Tech. Michael Scott", status: "Pending" },
    { no: "ZN-304", clinic: "Royal Clinic", patient: "Saif Al-Naimi", dentist: "Dr. Aisha Al-Jaber", technician: "Tech. Robert Downey", status: "Finish" },
    { no: "ZN-305", clinic: "Aspetar Clinic", patient: "Hessa Al-Sada", dentist: "Dr. Khaled Abdulla", technician: "Tech. Bruce Wayne", status: "Finish" },
    { no: "ZN-306", clinic: "Al Khor Dental", patient: "Jassim Al-Mulla", dentist: "Dr. Mona Al-Kubaisi", technician: "Tech. Peter Parker", status: "Pending" },
    { no: "ZN-307", clinic: "Qatar Ortho Clinic", patient: "Lulwa Al-Sulaiti", dentist: "Dr. Yousef Al-Harami", technician: "Tech. Clark Kent", status: "Finish" },
    { no: "ZN-308", clinic: "Doha Premium Dentistry", patient: "Abdulaziz Al-Jefairi", dentist: "Dr. Layla Al-Masri", technician: "Tech. Diana Prince", status: "Finish" },
    { no: "ZN-309", clinic: "Smile Signature", patient: "Jaber Al-Marzooqi", dentist: "Dr. George Clooney", technician: "Tech. Steve Rogers", status: "Pending" },
    { no: "ZN-310", clinic: "Wakra Dental", patient: "Rawda Al-Khori", dentist: "Dr. Yasmin Al-Ansari", technician: "Tech. Natasha Romanoff", status: "Finish" }
  ],
  CAD: [
    { no: "CD-401", clinic: "Pearl Dental Studio", patient: "Saad Al-Suwaidi", dentist: "Dr. Faisal Rashid", technician: "Tech. Alice Wong", status: "Pending" },
    { no: "CD-402", clinic: "Royal Clinic", patient: "Mona Al-Naimi", dentist: "Dr. Aisha Al-Jaber", technician: "Tech. Robert Downey", status: "Finish" },
    { no: "CD-403", clinic: "Aspetar Clinic", patient: "Mansoor Al-Sada", dentist: "Dr. Khaled Abdulla", technician: "Tech. Bruce Wayne", status: "Finish" },
    { no: "CD-404", clinic: "Al Khor Dental", patient: "Nasser Al-Mulla", dentist: "Dr. Mona Al-Kubaisi", technician: "Tech. Peter Parker", status: "Pending" },
    { no: "CD-405", clinic: "Qatar Ortho Clinic", patient: "Latifa Al-Sulaiti", dentist: "Dr. Yousef Al-Harami", technician: "Tech. Clark Kent", status: "Finish" },
    { no: "CD-406", clinic: "Doha Premium Dentistry", patient: "Fahad Al-Jefairi", dentist: "Dr. Layla Al-Masri", technician: "Tech. Diana Prince", status: "Finish" },
    { no: "CD-407", clinic: "Smile Signature", patient: "Amal Al-Marzooqi", dentist: "Dr. George Clooney", technician: "Tech. Steve Rogers", status: "Pending" },
    { no: "CD-408", clinic: "Wakra Dental", patient: "Othman Al-Khori", dentist: "Dr. Yasmin Al-Ansari", technician: "Tech. Natasha Romanoff", status: "Finish" },
    { no: "CD-409", clinic: "Doha Dental Center", patient: "Sheikha Al-Kuwari", dentist: "Dr. Sarah Al-Thani", technician: "Tech. John Doe", status: "Pending" },
    { no: "CD-410", clinic: "West Bay Ortho", patient: "Jaber Al-Marri", dentist: "Dr. Marcus Vance", technician: "Tech. Sarah Connor", status: "Finish" }
  ],
  CAM: [
    { no: "CM-501", clinic: "Royal Clinic", patient: "Soud Al-Naimi", dentist: "Dr. Aisha Al-Jaber", technician: "Tech. Robert Downey", status: "Pending" },
    { no: "CM-502", clinic: "Aspetar Clinic", patient: "Ghanim Al-Sada", dentist: "Dr. Khaled Abdulla", technician: "Tech. Bruce Wayne", status: "Finish" },
    { no: "CM-503", clinic: "Al Khor Dental", patient: "Sarah Al-Mulla", dentist: "Dr. Mona Al-Kubaisi", technician: "Tech. Peter Parker", status: "Finish" },
    { no: "CM-504", clinic: "Qatar Ortho Clinic", patient: "Hassan Al-Sulaiti", dentist: "Dr. Yousef Al-Harami", technician: "Tech. Clark Kent", status: "Pending" },
    { no: "CM-505", clinic: "Doha Premium Dentistry", patient: "Reem Al-Jefairi", dentist: "Dr. Layla Al-Masri", technician: "Tech. Diana Prince", status: "Finish" },
    { no: "CM-506", clinic: "Smile Signature", patient: "Hamad Al-Marzooqi", dentist: "Dr. George Clooney", technician: "Tech. Steve Rogers", status: "Finish" },
    { no: "CM-507", clinic: "Wakra Dental", patient: "Noura Al-Khori", dentist: "Dr. Yasmin Al-Ansari", technician: "Tech. Natasha Romanoff", status: "Pending" },
    { no: "CM-508", clinic: "Doha Dental Center", patient: "Wafa Al-Kuwari", dentist: "Dr. Sarah Al-Thani", technician: "Tech. John Doe", status: "Finish" },
    { no: "CM-509", clinic: "West Bay Ortho", patient: "Saif Al-Marri", dentist: "Dr. Marcus Vance", technician: "Tech. Sarah Connor", status: "Finish" },
    { no: "CM-510", clinic: "Al-Ahli Dental", patient: "Lulwa Al-Baker", dentist: "Dr. Kareem Ahmed", technician: "Tech. David Chen", status: "Pending" }
  ]
}

const driverDetailsCases = {
  "Bilal Khalid": [
    { no: "DF-801", clinic: "Pearl Dental Studio", patient: "Fatima Al-Suwaidi", dentist: "Dr. Faisal Rashid", status: "Delivered", time: "09:30 AM" },
    { no: "DF-802", clinic: "Elite Medical Center", patient: "Hamad Al-Marri", dentist: "Dr. Elena Rostova", status: "Delivered", time: "10:15 AM" },
    { no: "DF-803", clinic: "Smile Signature", patient: "Khalid Al-Marri", dentist: "Dr. George Clooney", status: "Pending", time: "11:45 AM" },
    { no: "DF-804", clinic: "West Bay Ortho", patient: "Jassim Al-Marri", dentist: "Dr. Marcus Vance", status: "Assigned", time: "01:30 PM" },
    { no: "DF-805", clinic: "Aspetar Clinic", patient: "Aisha Al-Thani", dentist: "Dr. Khaled Abdulla", status: "Assigned", time: "02:00 PM" }
  ],
  "Yousuf Khan": [
    { no: "DF-811", clinic: "Doha Dental Center", patient: "Ali Al-Baker", dentist: "Dr. Sarah Al-Thani", status: "Delivered", time: "08:45 AM" },
    { no: "DF-812", clinic: "Al-Ahli Dental", patient: "Mariam Al-Kuwari", dentist: "Dr. Kareem Ahmed", status: "Delivered", time: "10:30 AM" },
    { no: "DF-813", clinic: "Qatar Ortho Clinic", patient: "Salem Al-Marri", dentist: "Dr. Yousef Al-Harami", status: "Pending", time: "01:00 PM" },
    { no: "DF-814", clinic: "Royal Clinic", patient: "Saif Al-Naimi", dentist: "Dr. Aisha Al-Jaber", status: "Assigned", time: "03:15 PM" }
  ],
  "Khalid Rashid": [
    { no: "DF-821", clinic: "Wakra Dental", patient: "Sara Al-Khori", dentist: "Dr. Yasmin Al-Ansari", status: "Delivered", time: "09:00 AM" },
    { no: "DF-822", clinic: "Al Khor Dental", patient: "Noura Al-Mulla", dentist: "Dr. Mona Al-Kubaisi", status: "Delivered", time: "11:00 AM" },
    { no: "DF-823", clinic: "Doha Premium Dentistry", patient: "Fahad Al-Jefairi", dentist: "Dr. Layla Al-Masri", status: "Delivered", time: "01:30 PM" }
  ],
  "Ahmed Hassan": [
    { no: "DF-831", clinic: "Royal Clinic", patient: "Mona Al-Naimi", dentist: "Dr. Aisha Al-Jaber", status: "Pending", time: "10:00 AM" },
    { no: "DF-832", clinic: "Smile Signature", patient: "Amal Al-Marzooqi", dentist: "Dr. George Clooney", status: "Pending", time: "11:30 AM" },
    { no: "DF-833", clinic: "Pearl Dental Studio", patient: "Saad Al-Suwaidi", dentist: "Dr. Faisal Rashid", status: "Assigned", time: "02:45 PM" }
  ],
  "Fatima Al-Mohannadi": [
    { no: "DF-841", clinic: "Elite Medical Center", patient: "Reem Al-Thani", dentist: "Dr. Elena Rostova", status: "Delivered", time: "08:15 AM" },
    { no: "DF-842", clinic: "Aspetar Clinic", patient: "Mansoor Al-Sada", dentist: "Dr. Khaled Abdulla", status: "Delivered", time: "09:45 AM" },
    { no: "DF-843", clinic: "Al Khor Dental", patient: "Dana Al-Mulla", dentist: "Dr. Mona Al-Kubaisi", status: "Pending", time: "12:15 PM" },
    { no: "DF-844", clinic: "West Bay Ortho", patient: "Sara Al-Kuwari", dentist: "Dr. Marcus Vance", status: "Assigned", time: "03:30 PM" }
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

const shortTabNames = {
  ordersReceivedToday: "Received",
  ordersDeliveredToday: "To Deliver",
  activeCases: "Active",
  fittingsCreatedToday: "Created",
  fittingsDeliveredToday: "To Pick",
  ordersPastDue: "Ord Past",
  fittingsPastDue: "Fit Past",
  drivers: "Drivers"
}

function DashboardPage() {
  const [mounted, setMounted] = React.useState(false)
  const [dateRange, setDateRange] = React.useState({ from: undefined, to: undefined })
  const [casesData, setCasesData] = React.useState(tabbedCasesData)
  const [selectedWork, setSelectedWork] = React.useState(null)
  const [selectedDriver, setSelectedDriver] = React.useState(null)

  const handleMoveRow = (rowId, sourceTab, targetTab) => {
    if (sourceTab === targetTab) return

    setCasesData(prev => {
      const sourceList = prev[sourceTab] || []
      const targetList = prev[targetTab] || []
      const itemToMove = sourceList.find(item => item.id === rowId)
      
      if (!itemToMove) return prev

      return {
        ...prev,
        [sourceTab]: sourceList.filter(item => item.id !== rowId),
        [targetTab]: [itemToMove, ...targetList]
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

  const chartData = Object.entries(casesData).map(([key, list]) => ({
    key,
    name: shortTabNames[key] || key,
    fullName: tabNames[key] || key,
    count: list.length
  }))

  const maxCaseCount = Math.max(...chartData.map(d => d.count), 1)
  const totalCases = chartData.reduce((acc, curr) => acc + curr.count, 0)
  const avgCases = (totalCases / chartData.length).toFixed(1)

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

      {/* Today's Overdue Delivery Alerts Section */}
      {((casesData.ordersPastDue || []).length > 0 || (casesData.fittingsPastDue || []).length > 0) && (
        <div className="space-y-3 bg-rose-50/20 dark:bg-rose-950/5 border border-rose-200/30 dark:border-rose-900/10 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              <h3 className="text-sm font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5 uppercase tracking-wider">
                <AlertTriangle className="h-4 w-4" /> Overdue Delivery Warnings
              </h3>
            </div>
            <span className="text-[10px] text-rose-600 dark:text-rose-400 font-bold bg-rose-100/60 dark:bg-rose-900/30 px-2 py-0.5 rounded-full border border-rose-200/50">
              {casesData.ordersPastDue.length + casesData.fittingsPastDue.length} Urgent Alerts
            </span>
          </div>

          <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Map ordersPastDue */}
            {casesData.ordersPastDue.map((item) => {
              const details = (workDetailsCases[item.work] || []).find(d => d.no === item.no) || {};
              return (
                <div 
                  key={item.id} 
                  className="bg-background border border-rose-200/50 dark:border-rose-900/30 p-3.5 rounded-lg flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />
                  <div className="p-2 bg-rose-50 dark:bg-rose-950/50 rounded-lg text-rose-500 shrink-0">
                    <Package className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[9px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider bg-rose-50 dark:bg-rose-900/30 px-1 py-0.5 rounded border border-rose-200/30">
                        Order Overdue
                      </span>
                      <span className="text-[9px] text-muted-foreground font-semibold flex items-center gap-1">
                        <Clock className="h-3 w-3 text-rose-500" /> Past Due
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-foreground mt-2 flex items-center gap-1">
                      {item.work} Case • <span className="font-mono text-[11px] text-main font-bold">{item.no}</span>
                    </h4>
                    <div className="mt-1.5 space-y-0.5 text-[11px] text-muted-foreground">
                      <p className="truncate"><strong className="text-foreground font-medium">Clinic:</strong> {details.clinic || "Doha Dental Center"}</p>
                      <p className="truncate"><strong className="text-foreground font-medium">Patient:</strong> {details.patient || "Nasser Al-Suwaidi"}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Map fittingsPastDue */}
            {casesData.fittingsPastDue.map((item) => {
              const details = (workDetailsCases[item.work] || []).find(d => d.no === item.no) || {};
              return (
                <div 
                  key={item.id} 
                  className="bg-background border border-rose-200/50 dark:border-rose-900/30 p-3.5 rounded-lg flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />
                  <div className="p-2 bg-rose-50 dark:bg-rose-950/50 rounded-lg text-rose-500 shrink-0">
                    <ClipboardList className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[9px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider bg-rose-50 dark:bg-rose-900/30 px-1 py-0.5 rounded border border-rose-200/30">
                        Fitting Overdue
                      </span>
                      <span className="text-[9px] text-muted-foreground font-semibold flex items-center gap-1">
                        <Clock className="h-3 w-3 text-rose-500" /> Past Due
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-foreground mt-2 flex items-center gap-1">
                      {item.work} Case • <span className="font-mono text-[11px] text-main font-bold">{item.no}</span>
                    </h4>
                    <div className="mt-1.5 space-y-0.5 text-[11px] text-muted-foreground">
                      <p className="truncate"><strong className="text-foreground font-medium">Clinic:</strong> {details.clinic || "Smile Signature"}</p>
                      <p className="truncate"><strong className="text-foreground font-medium">Patient:</strong> {details.patient || "Fatima Al-Kuwari"}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

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
                        <TableHead className="pl-6 py-3 font-semibold text-foreground text-xs uppercase tracking-wider">Works</TableHead>
                        <TableHead className="py-3 font-semibold text-foreground text-xs uppercase tracking-wider">Status</TableHead>
                        <TableHead className="pr-6 py-3 text-right font-semibold text-foreground text-xs uppercase tracking-wider">Assign Department</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rows.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                            No cases found in this category.
                          </TableCell>
                        </TableRow>
                      ) : (
                        rows.map((row) => (
                          <TableRow key={row.id} className="hover:bg-muted/30 transition-colors">
                            <TableCell className="pl-6 py-4">
                              <span 
                                onClick={() => setSelectedWork(row)} 
                                className="font-semibold text-main hover:underline cursor-pointer transition-all text-sm"
                              >
                                {row.work}
                              </span>
                            </TableCell>
                            <TableCell className="py-4">
                              <span className={cn(
                                "text-xs font-semibold px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5",
                                row.status === "Pending" && "bg-amber-50 text-amber-700 border-amber-200/50 dark:bg-amber-900/30 dark:text-amber-400",
                                row.status === "Finish" && "bg-emerald-50 text-emerald-700 border-emerald-200/50 dark:bg-emerald-900/30 dark:text-emerald-400"
                              )}>
                                <span className={cn(
                                  "w-1.5 h-1.5 rounded-full",
                                  row.status === "Pending" && "bg-amber-500",
                                  row.status === "Finish" && "bg-emerald-500"
                                )}></span>
                                {row.status}
                              </span>
                            </TableCell>
                            <TableCell className="pr-6 py-4 text-right">
                              <select
                                value={tabKey}
                                onChange={(e) => handleMoveRow(row.id, tabKey, e.target.value)}
                                className="text-xs bg-background hover:bg-muted text-foreground border border-input rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-main cursor-pointer font-medium transition-all max-w-[180px] inline-block text-left"
                              >
                                {Object.entries(tabNames).map(([key, label]) => (
                                  <option key={key} value={key}>
                                    {label}
                                  </option>
                                ))}
                              </select>
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
        {/* Department Cases Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Department Cases Overview</CardTitle>
            <CardDescription>Active case load across all workflow departments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] flex items-end justify-between gap-4 px-2 border-b border-border pb-2">
              {chartData.map((data, index) => {
                const isPastDue = data.key === "ordersPastDue" || data.key === "fittingsPastDue"
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer" title={data.fullName}>
                    <div className="text-xs font-bold text-muted-foreground group-hover:text-foreground transition-colors mb-1">
                      {data.count}
                    </div>
                    <div 
                      className={cn(
                        "w-full rounded-t-md transition-all duration-300",
                        isPastDue 
                          ? "bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700" 
                          : "bg-main hover:bg-mainhvr"
                      )}
                      style={{ height: `${(data.count / maxCaseCount) * 160}px`, minHeight: data.count > 0 ? "4px" : "0px" }}
                    />
                    <div className="text-[10px] font-semibold text-muted-foreground group-hover:text-foreground transition-colors truncate max-w-full text-center mt-1">
                      {data.name}
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between mt-4 text-xs font-medium text-muted-foreground">
              <span>Total Cases: <strong className="text-foreground">{totalCases}</strong></span>
              <span>Average Cases: <strong className="text-foreground">{avgCases}</strong>/department</span>
            </div>
          </CardContent>
        </Card>

        {/* Technician Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Technician Overview</CardTitle>
            <CardDescription>Case assignment and completion statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {technicianData.map((tech) => (
                <div key={tech.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${tech.name}`} alt="Avatar" />
                      <AvatarFallback>{tech.name.replace("Tech. ", "").charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-foreground">{tech.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        {tech.assigned} Assigned
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-main">{tech.completed} Finished</p>
                    <span className="text-[10px] text-muted-foreground font-medium">Completed cases</span>
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
            <CardDescription>Driver status details after products dispatched</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activityLog.map((activity) => (
                <div 
                  key={activity.id} 
                  className="flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedDriver(activity)}
                >
                  <div className="w-2 h-2 rounded-full mt-2 bg-purple-500 shrink-0" />
                  <div className="flex-1 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <div>
                      <p className="text-sm font-medium text-foreground">{activity.driver}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {activity.route ? `${activity.route} • ` : ""}{activity.status} • {activity.time}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 text-[10px] font-bold shrink-0">
                      <span className="bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400 px-2 py-0.5 rounded border border-blue-200/50">
                        {activity.assigned} Assigned
                      </span>
                      <span className="bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400 px-2 py-0.5 rounded border border-amber-200/50">
                        {activity.pending} Pending
                      </span>
                      <span className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 px-2 py-0.5 rounded border border-emerald-200/50">
                        {activity.delivered} Delivered
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!selectedWork} onOpenChange={(open) => !open && setSelectedWork(null)}>
        <DialogContent className="max-w-4xl sm:max-w-[850px] p-6 bg-background border border-border rounded-lg shadow-2xl overflow-y-auto max-h-[90vh]">
          <DialogHeader className="border-b pb-3 mb-4">
            <DialogTitle className="text-xl font-bold text-main flex items-center gap-2">
              <Activity className="h-5 w-5" /> Work Specifications & Cases List
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Detailed history and tracking log for the selected work department.
            </DialogDescription>
          </DialogHeader>
          
          {selectedWork && (
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 bg-muted/45 px-4 rounded-lg border border-border">
                <div>
                  <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider block">Work Type</span>
                  <span className="text-lg font-bold text-main">{selectedWork.work}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider block">Department Overall Status</span>
                  <span className={cn(
                    "text-xs font-semibold px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5 mt-1",
                    selectedWork.status === "Pending" && "bg-amber-50 text-amber-700 border-amber-200/50 dark:bg-amber-900/30 dark:text-amber-400",
                    selectedWork.status === "Finish" && "bg-emerald-50 text-emerald-700 border-emerald-200/50 dark:bg-emerald-900/30 dark:text-emerald-400"
                  )}>
                    <span className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      selectedWork.status === "Pending" && "bg-amber-500",
                      selectedWork.status === "Finish" && "bg-emerald-500"
                    )}></span>
                    {selectedWork.status}
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto rounded-lg border border-border">
                <Table>
                  <TableHeader className="bg-muted/40">
                    <TableRow>
                      <TableHead className="pl-4 py-2 font-semibold text-foreground text-xs uppercase tracking-wider">Case No</TableHead>
                      <TableHead className="py-2 font-semibold text-foreground text-xs uppercase tracking-wider">Clinic</TableHead>
                      <TableHead className="py-2 font-semibold text-foreground text-xs uppercase tracking-wider">Patient</TableHead>
                      <TableHead className="py-2 font-semibold text-foreground text-xs uppercase tracking-wider">Dentist / Tech</TableHead>
                      <TableHead className="pr-4 py-2 text-right font-semibold text-foreground text-xs uppercase tracking-wider">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(workDetailsCases[selectedWork.work] || []).map((caseRow) => (
                      <TableRow key={caseRow.no} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="pl-4 py-3 font-mono text-xs text-main font-semibold">{caseRow.no}</TableCell>
                        <TableCell className="py-3 text-xs font-medium text-foreground">{caseRow.clinic}</TableCell>
                        <TableCell className="py-3 text-xs text-foreground">{caseRow.patient}</TableCell>
                        <TableCell className="py-3 text-xs text-muted-foreground">
                          <div className="text-foreground font-medium">{caseRow.dentist}</div>
                          <div className="text-[10px]">{caseRow.technician}</div>
                        </TableCell>
                        <TableCell className="pr-4 py-3 text-right">
                          <span className={cn(
                            "text-[10px] font-semibold px-2 py-0.5 rounded-full border inline-flex items-center gap-1",
                            caseRow.status === "Pending" && "bg-amber-50 text-amber-700 border-amber-200/50 dark:bg-amber-900/30 dark:text-amber-400",
                            caseRow.status === "Finish" && "bg-emerald-50 text-emerald-700 border-emerald-200/50 dark:bg-emerald-900/30 dark:text-emerald-400"
                          )}>
                            <span className={cn(
                              "w-1 h-1 rounded-full",
                              caseRow.status === "Pending" && "bg-amber-500",
                              caseRow.status === "Finish" && "bg-emerald-500"
                            )}></span>
                            {caseRow.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedWork(null)}
                  className="px-4 py-2 bg-main hover:bg-main/90 text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer"
                >
                  Close Case List
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedDriver} onOpenChange={(open) => !open && setSelectedDriver(null)}>
        <DialogContent className="max-w-4xl sm:max-w-[850px] p-6 bg-background border border-border rounded-lg shadow-2xl overflow-y-auto max-h-[90vh]">
          <DialogHeader className="border-b pb-3 mb-4">
            <DialogTitle className="text-xl font-bold text-main flex items-center gap-2">
              <Truck className="h-5 w-5" /> Driver Dispatch & Delivery Details
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Real-time delivery status breakdown and individual case tracking.
            </DialogDescription>
          </DialogHeader>
          
          {selectedDriver && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 py-3 bg-muted/45 px-4 rounded-lg border border-border">
                <div>
                  <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider block">Driver Name</span>
                  <span className="text-lg font-bold text-main">{selectedDriver.driver}</span>
                  <span className="text-xs text-muted-foreground block mt-0.5">{selectedDriver.route}</span>
                </div>
                <div className="flex gap-2 animate-in fade-in slide-in-from-right-3 duration-300">
                  <div className="text-center px-3 py-1.5 bg-blue-50 dark:bg-blue-950/20 border border-blue-200/50 rounded-lg">
                    <span className="text-[10px] text-blue-700 dark:text-blue-400 font-semibold block uppercase">Assigned</span>
                    <span className="text-base font-bold text-blue-800 dark:text-blue-300">{selectedDriver.assigned}</span>
                  </div>
                  <div className="text-center px-3 py-1.5 bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 rounded-lg">
                    <span className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold block uppercase">Pending</span>
                    <span className="text-base font-bold text-amber-800 dark:text-amber-300">{selectedDriver.pending}</span>
                  </div>
                  <div className="text-center px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/50 rounded-lg">
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold block uppercase">Delivered</span>
                    <span className="text-base font-bold text-emerald-800 dark:text-emerald-300">{selectedDriver.delivered}</span>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto rounded-lg border border-border">
                <Table>
                  <TableHeader className="bg-muted/40">
                    <TableRow>
                      <TableHead className="pl-4 py-2 font-semibold text-foreground text-xs uppercase tracking-wider">Case No</TableHead>
                      <TableHead className="py-2 font-semibold text-foreground text-xs uppercase tracking-wider">Clinic</TableHead>
                      <TableHead className="py-2 font-semibold text-foreground text-xs uppercase tracking-wider">Patient</TableHead>
                      <TableHead className="py-2 font-semibold text-foreground text-xs uppercase tracking-wider">Dentist</TableHead>
                      <TableHead className="py-2 font-semibold text-foreground text-xs uppercase tracking-wider">Dispatch Time</TableHead>
                      <TableHead className="pr-4 py-2 text-right font-semibold text-foreground text-xs uppercase tracking-wider">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(driverDetailsCases[selectedDriver.driver] || []).map((caseRow) => (
                      <TableRow key={caseRow.no} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="pl-4 py-3 font-mono text-xs text-main font-semibold">{caseRow.no}</TableCell>
                        <TableCell className="py-3 text-xs font-medium text-foreground">{caseRow.clinic}</TableCell>
                        <TableCell className="py-3 text-xs text-foreground">{caseRow.patient}</TableCell>
                        <TableCell className="py-3 text-xs text-muted-foreground">{caseRow.dentist}</TableCell>
                        <TableCell className="py-3 text-xs text-muted-foreground">{caseRow.time}</TableCell>
                        <TableCell className="pr-4 py-3 text-right">
                          <span className={cn(
                            "text-[10px] font-semibold px-2 py-0.5 rounded-full border inline-flex items-center gap-1",
                            caseRow.status === "Assigned" && "bg-blue-50 text-blue-700 border-blue-200/50 dark:bg-blue-900/30 dark:text-blue-400",
                            caseRow.status === "Pending" && "bg-amber-50 text-amber-700 border-amber-200/50 dark:bg-amber-900/30 dark:text-amber-400",
                            caseRow.status === "Delivered" && "bg-emerald-50 text-emerald-700 border-emerald-200/50 dark:bg-emerald-900/30 dark:text-emerald-400"
                          )}>
                            <span className={cn(
                              "w-1.5 h-1.5 rounded-full",
                              caseRow.status === "Assigned" && "bg-blue-500",
                              caseRow.status === "Pending" && "bg-amber-500",
                              caseRow.status === "Delivered" && "bg-emerald-500"
                            )}></span>
                            {caseRow.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedDriver(null)}
                  className="px-4 py-2 bg-main hover:bg-main/90 text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer"
                >
                  Close Driver Details
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default DashboardPage
