"use client";
import type { Car } from "@/lib/cars";

interface CarCardProps {
  car: Car;
  isCompared: boolean;
  onSelectModel: (car: Car) => void;
  onToggleCompare: (car: Car, checked: boolean) => void;
  onOpenSpecs: (car: Car) => void;
}

function CarEmoji({ category }: { category: string }) {
  const emoji = category === "SUVS" ? "🚙" : category === "HATCHBACKS" ? "🚗" : "🚘";
  return <span className="text-6xl opacity-20">{emoji}</span>;
}

export default function CarCard({
  car,
  isCompared,
  onSelectModel,
  onToggleCompare,
  onOpenSpecs,
}: CarCardProps) {
  return (
    <div className="bg-[#f0ece4] rounded-xl overflow-hidden text-[#111] flex flex-col transition-transform hover:-translate-y-0.5 hover:shadow-2xl">
      {/* Header */}
      <div className="px-4 pt-4 pb-0">
        <h3 className="font-condensed font-extrabold text-xl tracking-wide uppercase">{car.name}</h3>
        <p className="text-xs text-[#666] italic mb-2">Starting at {car.price}</p>
      </div>

      {/* Image */}
      <div className="h-36 flex items-center justify-center bg-gradient-to-br from-[#e8e4dc] to-[#f5f1ea]">
        <CarEmoji category={car.category} />
      </div>

      {/* Specs */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 px-4 py-3 text-sm">
        <div>
          <p className="font-semibold">{car.hp} HP</p>
          <p className="text-xs italic text-[#666]">Horsepower</p>
        </div>
        <div>
          <p className="font-semibold">{car.groundClearance} MM</p>
          <p className="text-xs italic text-[#666]">Ground Clearance</p>
        </div>
        <div className="mt-1">
          <p className="font-semibold">{car.torque} NM</p>
          <p className="text-xs italic text-[#666]">Torque</p>
        </div>
        <div className="mt-1">
          <p className="font-semibold">{car.cc} CC</p>
          <p className="text-xs italic text-[#666]">Engine</p>
        </div>
      </div>

      {/* CTA — opens Tech Spec modal */}
      <button
        onClick={() => onOpenSpecs(car)}
        className="mx-4 mb-3 py-2.5 bg-[#111] text-white font-condensed font-bold text-sm tracking-widest uppercase rounded-md hover:bg-[#333] transition-colors"
      >
        Select Model
      </button>

      {/* Footer */}
      <div className="flex justify-between items-center px-4 py-2.5 border-t border-[#ddd] text-xs">
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={isCompared}
            onChange={(e) => onToggleCompare(car, e.target.checked)}
            className="w-3.5 h-3.5 cursor-pointer"
          />
          <span>Compare</span>
        </label>
        <button
          onClick={() => onOpenSpecs(car)}
          className="italic text-[#555] underline hover:text-[#111] transition-colors"
        >
          Technical Specifications
        </button>
      </div>
    </div>
  );
}
