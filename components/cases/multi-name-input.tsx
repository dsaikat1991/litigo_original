"use client";

import { Plus, X } from "lucide-react";

export function MultiNameInput({
  label,
  values,
  onChange,
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
}) {
  function updateAt(index: number, value: string) {
    const next = [...values];
    next[index] = value;
    onChange(next);
  }

  function addRow() {
    onChange([...values, ""]);
  }

  function removeRow(index: number) {
    onChange(values.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <button
          type="button"
          onClick={addRow}
          title={`Add another ${label.toLowerCase()}`}
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition-colors hover:border-gray-900 hover:text-gray-900"
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>
      <div className="space-y-2">
        {values.map((value, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              value={value}
              onChange={(e) => updateAt(i, e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            />
            {values.length > 1 && (
              <button
                type="button"
                onClick={() => removeRow(i)}
                title="Remove"
                className="shrink-0 rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-50 hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
