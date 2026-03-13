"use client";
import { useState } from "react";
import type { CarCategory, EngineType } from "@/lib/cars";

export interface FilterState {
  categories: Set<CarCategory>;
  usage: Set<string>;
  years: Set<number>;
  engines: Set<EngineType>;
}

interface SidebarProps {
  filters: FilterState;
  onCategoryToggle: (cat: CarCategory) => void;
  onUsageToggle: (u: string) => void;
  onYearToggle: (y: number) => void;
  onEngineToggle: (e: EngineType) => void;
  onClearAll: () => void;
}

const CATEGORIES: CarCategory[] = ["SEDANS", "SUVS", "HATCHBACKS"];
const USAGE_OPTIONS = ["Family Car", "City Car", "Off-Road"];
const YEARS = [2024, 2025, 2026];
const ENGINES: EngineType[] = ["Petrol", "Diesel", "Electric"];

function ExpandSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-4 font-condensed font-bold text-sm tracking-widest uppercase text-white"
      >
        <span>{title}</span>
        <span className="text-gold text-lg leading-none">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="pb-3 space-y-2">{children}</div>}
    </div>
  );
}

export default function Sidebar({
  filters,
  onCategoryToggle,
  onUsageToggle,
  onYearToggle,
  onEngineToggle,
  onClearAll,
}: SidebarProps) {
  const [catOpen, setCatOpen] = useState(true);
  const [usageOpen, setUsageOpen] = useState(true);

  return (
    <aside className="w-[280px] min-w-[260px] border-r border-white/10 px-5 py-6 overflow-y-auto flex-shrink-0">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <span className="text-sm text-white/50 italic">Filter by</span>
        <button
          onClick={onClearAll}
          className="text-sm text-white/50 underline hover:text-white transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Category */}
      <div className="mb-6">
        <button
          onClick={() => setCatOpen(!catOpen)}
          className="w-full flex justify-between items-center mb-3 font-condensed font-bold text-base tracking-widest uppercase"
        >
          <span>Category</span>
          <span className="text-gold text-lg leading-none">{catOpen ? "−" : "+"}</span>
        </button>
        {catOpen && (
          <div className="space-y-2">
            {CATEGORIES.map((cat) => {
              const active = filters.categories.has(cat);
              return (
                <button
                  key={cat}
                  onClick={() => onCategoryToggle(cat)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-md border font-condensed font-semibold text-sm tracking-widest uppercase transition-colors ${
                    active ? "border-gold" : "border-white/20"
                  } bg-surface hover:border-gold/60`}
                >
                  <span
                    className={`w-4 h-4 border-2 border-gold rounded-sm flex-shrink-0 flex items-center justify-center ${
                      active ? "bg-gold" : "bg-transparent"
                    }`}
                  >
                    {active && <span className="w-2 h-2 bg-[#111] rounded-sm block" />}
                  </span>
                  {cat}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* By Usage */}
      <div className="mb-6">
        <button
          onClick={() => setUsageOpen(!usageOpen)}
          className="w-full flex justify-between items-center mb-3 font-condensed font-bold text-base tracking-widest uppercase"
        >
          <span>By Usage</span>
          <span className="text-gold text-lg leading-none">{usageOpen ? "−" : "+"}</span>
        </button>
        {usageOpen && (
          <div className="space-y-2">
            {USAGE_OPTIONS.map((u) => (
              <label key={u} className="flex items-center gap-2.5 cursor-pointer italic text-sm text-white/80">
                <input
                  type="checkbox"
                  checked={filters.usage.has(u)}
                  onChange={() => onUsageToggle(u)}
                  className="accent-gold w-4 h-4 cursor-pointer"
                />
                {u}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Model Year */}
      <ExpandSection title="Model Year">
        {YEARS.map((y) => (
          <label key={y} className="flex items-center gap-2.5 cursor-pointer italic text-sm text-white/80">
            <input
              type="checkbox"
              checked={filters.years.has(y)}
              onChange={() => onYearToggle(y)}
              className="accent-gold w-4 h-4 cursor-pointer"
            />
            {y}
          </label>
        ))}
      </ExpandSection>

      {/* Engine */}
      <ExpandSection title="Engine">
        {ENGINES.map((e) => (
          <label key={e} className="flex items-center gap-2.5 cursor-pointer italic text-sm text-white/80">
            <input
              type="checkbox"
              checked={filters.engines.has(e)}
              onChange={() => onEngineToggle(e)}
              className="accent-gold w-4 h-4 cursor-pointer"
            />
            {e}
          </label>
        ))}
      </ExpandSection>
    </aside>
  );
}
