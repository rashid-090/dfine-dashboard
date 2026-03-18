"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Home,
  Database,
  Repeat,
  FileBarChart,
  MoreHorizontal,
  Activity,
  ChevronDown
} from "lucide-react"

const navigationConfig = [
  {
    group: "MAIN MENU",
    items: [
      { title: "Dashboard", icon: Home, href: "/dashboard" },
      { 
        title: "Masters", 
        icon: Database, 
        children: [
          { title: "Definition", href: "/dashboard/definition" },
          { title: "Work Flow Definition", href: "/dashboard/work-flow-definition" },
          { 
            title: "Configuration", 
            href: "/configuration",
            children: [
              { title: "Tax Master", href: "/dashboard/tax-master" },
              { title: "Company Profile", href: "/dashboard/company-profile" },
            ]
          },
          {  title: "Work Product" , href: "/dashboard/work-product",},
          {  title: "Vendor Details" , href: "/dashboard/vendor-details",},
          {  title: "Clinic Details" , href: "/dashboard/clinic-details",},
          {  title: "Rate Assignment" , href: "/dashboard/rate-assignment",},
          {  title: "Staff Details", href: "/dashboard/staff-details", },
        ]
      },
      // { title: "Transaction", icon: Repeat, href: "/transactions" },
      // { title: "Report", icon: FileBarChart, href: "/reports" },
    ],
  },
]

export function Sidebar({ className, isMobile = false }) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = React.useState(["Masters"])

  const toggleExpand = (e, title) => {
    e.preventDefault()
    e.stopPropagation()
    setExpandedItems(prev => 
      prev.includes(title) ? prev.filter(i => i !== title) : [...prev, title]
    )
  }

  const NavItem = ({ item, depth = 0 }) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.includes(item.title)
    const isActive = pathname === item.href || 
                    (hasChildren && item.children?.some(child => pathname === child.href))
    
    const Icon = item.icon

    return (
      <div className="w-full flex flex-col">
        <div
          className={cn(
            "group flex w-full items-center rounded-lg rounded-r-none px-3 py-2 text-[14px] font-medium transition-colors",
            // Dark mode aware active/hover states
            isActive 
              ? "bg-primary/10 text-primary" 
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            depth > 0 && "text-sm"
          )}
        >
          {item.href && !hasChildren ? (
            <Link href={item.href} className="flex items-center w-full">
              <NavIcon isActive={isActive} Icon={Icon} />
              <span className="ml-3 truncate">{item.title}</span>
            </Link>
          ) : (
            <div 
              className="flex items-center cursor-pointer w-full" 
              onClick={(e) => toggleExpand(e, item.title)}
            >
              <NavIcon isActive={isActive} Icon={Icon} />
              <span className="ml-3 flex-1 truncate">{item.title}</span>
              {hasChildren && (
                <ChevronDown className={cn(
                  "ml-auto h-3.5 w-3.5 transition-transform duration-200",
                  isExpanded ? "rotate-180" : "rotate-0"
                )} />
              )}
            </div>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="w-full mt-1 border-l border-border ml-4 pl-2 overflow-x-hidden">
            {item.children.map((child) => (
              <NavItem key={child.title} item={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  const NavIcon = ({ isActive, Icon }) => {
    if (!Icon) {
      return (
        <div className="flex h-5 w-5 items-center justify-center shrink-0">
          <div className={cn(
            "h-1 w-1 rounded-full", 
            isActive ? "bg-primary" : "bg-muted-foreground/50"
          )} />
        </div>
      )
    }
    return <Icon className={cn("h-5 w-5 shrink-0", isActive ? "text-main" : "text-muted-foreground")} />
  }

  return (
    <aside 
      className={cn(
        // Using shadcn tokens: bg-background and border-border
        "border-r bg-background flex flex-col overflow-x-hidden", 
        isMobile 
          ? "w-full h-full" 
          : "fixed left-0 top-0 z-30 hidden h-screen w-[260px] md:flex",
        className
      )}
    >
      {/* Logo Section */}
      <div className="flex items-center px-6 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-main text-primary-foreground shadow-sm">
            <Activity className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-main leading-none">Dfine</span>
            <span className="text-[10px] font-semibold text-main uppercase tracking-wider mt-1">
              Clinic CRM
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 pr-3 py-6 scrollbar-thin">
        {navigationConfig.map((section) => (
          <div key={section.group} className="mb-6">
            <p className="px-3 mb-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              {section.group}
            </p>
            <div className="grid gap-1">
              {section.items.map((item) => (
                <NavItem key={item.title} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>

      
    </aside>
  )
}