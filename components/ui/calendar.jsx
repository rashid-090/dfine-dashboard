"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"

export function Calendar({ mode = "single", selected, onSelect, disabled, numberOfMonths = 1, className }) {
  const [currentMonth, setCurrentMonth] = React.useState(selected || new Date())
  
  const daysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days = []
    
    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null)
    }
    
    // Add all days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i))
    }
    
    return days
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const isSameDay = (date1, date2) => {
    if (!date2) return false
    return date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
  }

  const isDisabled = (date) => {
    if (disabled) return disabled(date)
    return false
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const days = daysInMonth(currentMonth)

  return (
    <div className={cn("p-3", className)}>
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "h-7 w-7"
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="font-medium">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </div>
        <button
          onClick={handleNextMonth}
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "h-7 w-7"
          )}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-muted-foreground py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}`} className="h-9 w-9" />
          }

          const isSelected = isSameDay(day, selected)
          const isDisabledDay = isDisabled(day)

          return (
            <button
              key={day.toISOString()}
              onClick={() => !isDisabledDay && onSelect?.(day)}
              disabled={isDisabledDay}
              className={cn(
                "h-9 w-9 rounded-md text-sm transition-colors",
                isSelected && "bg-primary text-primary-foreground hover:bg-primary/90",
                !isSelected && !isDisabledDay && "hover:bg-accent",
                isDisabledDay && "opacity-50 cursor-not-allowed"
              )}
            >
              {day.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
