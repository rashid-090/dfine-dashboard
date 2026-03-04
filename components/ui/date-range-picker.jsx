"use client"

import * as React from "react"
import { format, subDays } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

export function DateRangePicker({ className, date, onDateChange }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleSelect = (selectedDate, type) => {
    const newDate = { ...date }
    if (type === "from") {
      newDate.from = selectedDate
      if (!newDate.to || (selectedDate && selectedDate > newDate.to)) {
        newDate.to = selectedDate || subDays(new Date(), -7)
      }
    } else {
      newDate.to = selectedDate
    }
    onDateChange(newDate)
  }

  const presetRanges = [
    { label: "Today", from: new Date(), to: new Date() },
    { label: "Yesterday", from: subDays(new Date(), 1), to: subDays(new Date(), 1) },
    { label: "Last 7 days", from: subDays(new Date(), 7), to: new Date() },
    { label: "Last 30 days", from: subDays(new Date(), 30), to: new Date() },
    { label: "Last 90 days", from: subDays(new Date(), 90), to: new Date() },
  ]

  if (!mounted) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Button variant={"outline"} className={cn("w-[280px] justify-start text-left font-normal", !date.from && "text-muted-foreground")}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span>Pick a date range</span>
        </Button>
      </div>
    )
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <div className="flex">
            {/* Preset Ranges */}
            <div className="border-r p-3">
              <p className="mb-2 text-sm font-medium">Quick Select</p>
              <div className="space-y-1">
                {presetRanges.map((preset) => (
                  <Button
                    key={preset.label}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start font-normal"
                    onClick={() => {
                      onDateChange({ from: preset.from, to: preset.to })
                      setIsOpen(false)
                    }}
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Calendar */}
            <div className="p-3">
              <div className="flex gap-4">
                <div>
                  <p className="mb-2 text-sm font-medium">From</p>
                  <Calendar
                    mode="single"
                    selected={date.from}
                    onSelect={(selected) => handleSelect(selected, "from")}
                    numberOfMonths={1}
                  />
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium">To</p>
                  <Calendar
                    mode="single"
                    selected={date.to}
                    onSelect={(selected) => handleSelect(selected, "to")}
                    numberOfMonths={1}
                    disabled={(d) => date.from ? d < date.from : false}
                  />
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
