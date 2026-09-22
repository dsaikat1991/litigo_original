"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { cn } from "cn";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

function parseISODate(value: string): Date | undefined {
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return undefined;
  return new Date(y, m - 1, d);
}

function formatISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDisplayDate(value: string): string {
  const date = parseISODate(value);
  if (!date) return value;
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

function isoToday(): string {
  return formatISODate(new Date());
}

type DateFieldProps = {
  label: string;
  labelClassName?: string;
  /** Renders a hidden input with this name, for a plain native form's GET/POST submission. */
  name?: string;
  /** Uncontrolled initial value ("yyyy-mm-dd"), for a native-form usage. */
  defaultValue?: string;
  /** Controlled value ("yyyy-mm-dd" or ""), for a usage that manages its own state. */
  value?: string;
  onChange?: (value: string) => void;
  /** Trigger button className override (e.g. padding to match a denser surrounding form). */
  className?: string;
  /** Set false for a required date that should never be cleared back to empty. Default true. */
  clearable?: boolean;
};

export function DateField({
  label,
  labelClassName = "mb-1 block text-xs font-medium text-gray-700",
  name,
  defaultValue,
  value,
  onChange,
  className,
  clearable = true,
}: DateFieldProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const [open, setOpen] = useState(false);
  const current = value !== undefined ? value : internalValue;

  function setValue(next: string) {
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
    setOpen(false);
  }

  return (
    <div>
      <label className={labelClassName}>{label}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              "flex w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-left text-sm text-gray-900 transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 data-[empty=true]:text-gray-400",
              className
            )}
            data-empty={!current}
          >
            {current ? formatDisplayDate(current) : "dd-mm-yyyy"}
            <CalendarIcon className="size-4 shrink-0 text-gray-400" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={parseISODate(current)}
            onSelect={(date) => setValue(date ? formatISODate(date) : "")}
          />
          <div className="flex items-center justify-between border-t border-gray-100 px-3 py-2 text-xs font-medium">
            {clearable ? (
              <button type="button" onClick={() => setValue("")} className="text-gray-500 hover:text-gray-900">
                Clear
              </button>
            ) : (
              <span />
            )}
            <button type="button" onClick={() => setValue(isoToday())} className="text-gray-500 hover:text-gray-900">
              Today
            </button>
          </div>
        </PopoverContent>
      </Popover>
      {name && <input type="hidden" name={name} value={current} />}
    </div>
  );
}
