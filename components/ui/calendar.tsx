"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, getDefaultClassNames } from "react-day-picker"
import { cn } from "cn"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: cn("flex flex-col gap-4", defaultClassNames.months),
        month: cn("flex flex-col gap-3", defaultClassNames.month),
        month_caption: cn("flex items-center justify-center px-8 text-sm font-medium text-gray-900", defaultClassNames.month_caption),
        nav: cn("flex items-center justify-between", defaultClassNames.nav),
        button_previous: cn(
          "absolute left-1 flex size-7 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 disabled:pointer-events-none disabled:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          "absolute right-1 flex size-7 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 disabled:pointer-events-none disabled:opacity-50",
          defaultClassNames.button_next
        ),
        month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn("w-8 text-center text-xs font-normal text-gray-400", defaultClassNames.weekday),
        week: cn("mt-1 flex w-full", defaultClassNames.week),
        day: cn("relative size-8 p-0 text-center text-sm", defaultClassNames.day),
        day_button: cn(
          "size-8 rounded-md text-sm font-normal text-gray-700 transition-colors hover:bg-gray-100",
          defaultClassNames.day_button
        ),
        selected: cn("[&>button]:bg-gray-900 [&>button]:text-white [&>button]:hover:bg-gray-800", defaultClassNames.selected),
        today: cn("[&>button]:font-semibold [&>button]:text-gray-900", defaultClassNames.today),
        outside: cn("text-gray-300", defaultClassNames.outside),
        disabled: cn("text-gray-300 opacity-50", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className: chevronClassName, ...rest }) =>
          orientation === "left" ? (
            <ChevronLeft className={cn("size-4", chevronClassName)} {...rest} />
          ) : (
            <ChevronRight className={cn("size-4", chevronClassName)} {...rest} />
          ),
      }}
      {...props}
    />
  )
}

export { Calendar }
