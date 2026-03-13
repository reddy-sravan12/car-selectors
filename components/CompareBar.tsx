"use client";
import type { Car } from "@/lib/cars";

interface CompareBarProps {
  compareList: Car[];
  onRemove: (car: Car) => void;
  onCompare: () => void;
}

function CarEmoji({ category }: { category: string }) {
  return <span>{category === "SUVS" ? "🚙" : category === "HATCHBACKS" ? "🚗" : "🚘"}</span>;
}

export default function CompareBar({ compareList, onRemove, onCompare }: CompareBarProps) {
  const show = compareList.length > 0;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-[#141414] border-t border-white/10 px-6 py-3 flex items-center gap-3 z-30 transition-transform duration-200 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex gap-3 flex-1 flex-wrap items-center">
        {compareList.map((car) => (
          <div
            key={car.id}
            className="flex items-center gap-2.5 bg-[#2a2a2a] border border-white/10 rounded-md px-3 py-2 min-w-[170px]"
          >
            <CarEmoji category={car.category} />
            <div>
              <p className="font-condensed font-bold text-xs tracking-widest uppercase leading-tight">{car.name}</p>
            </div>
            <button
              onClick={() => onRemove(car)}
              className="ml-auto text-white/40 hover:text-white transition-colors text-base leading-none"
            >
              ✕
            </button>
          </div>
        ))}
        {compareList.length < 3 && (
          <div className="border border-dashed border-white/20 rounded-md px-5 py-2 text-white/40 italic text-xs min-w-[180px] text-center">
            Select Additional Trim
          </div>
        )}
      </div>

      <button
        onClick={onCompare}
        disabled={compareList.length < 2}
        className={`px-7 py-2.5 font-condensed font-bold text-sm tracking-widest uppercase rounded-md transition-colors ${
          compareList.length >= 2
            ? "bg-gold text-[#111] hover:bg-gold/80"
            : "bg-white/20 text-white/40 cursor-not-allowed"
        }`}
      >
        Compare Models
      </button>
    </div>
  );
}
