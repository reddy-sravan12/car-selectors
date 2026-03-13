"use client";
import type { Car } from "@/lib/cars";

interface CompareModalProps {
  cars: Car[];
  onClose: () => void;
}

const OVERVIEW_ROWS: { label: string; get: (c: Car) => string }[] = [
  { label: "Starting Price", get: (c) => c.price },
  { label: "Category", get: (c) => c.category },
  { label: "Year", get: (c) => String(c.year) },
  { label: "Engine Type", get: (c) => c.engine },
  { label: "Horsepower", get: (c) => `${c.hp} HP` },
  { label: "Torque", get: (c) => `${c.torque} NM` },
  { label: "Ground Clearance", get: (c) => `${c.groundClearance} MM` },
  { label: "Displacement", get: (c) => `${c.cc} CC` },
];

export default function CompareModal({ cars, onClose }: CompareModalProps) {
  if (cars.length === 0) return null;

  const allSections = Object.keys(cars[0].specs);

  return (
    <div className="fixed inset-0 bg-black/85 z-[200] overflow-y-auto py-10 px-5">
      <div className="max-w-4xl mx-auto bg-[#141414] rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-7 py-5 border-b border-white/10">
          <h2 className="font-condensed font-extrabold text-2xl tracking-widest uppercase">
            Compare Models
          </h2>
          <button
            onClick={onClose}
            className="text-gold text-2xl hover:text-gold/70 transition-colors leading-none"
          >
            ✕
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="bg-[#1a1a1a] px-5 py-4 text-left font-condensed font-bold text-sm tracking-widest uppercase text-gold min-w-[160px]">
                  Specification
                </th>
                {cars.map((car) => (
                  <th
                    key={car.id}
                    className="bg-[#1a1a1a] px-5 py-4 text-left font-condensed font-bold text-sm tracking-widest uppercase text-white"
                  >
                    {car.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Overview rows */}
              {OVERVIEW_ROWS.map((row) => (
                <tr key={row.label} className="border-b border-white/10 hover:bg-[#1a1a1a] transition-colors">
                  <td className="px-5 py-3.5 text-white/50 italic text-sm">{row.label}</td>
                  {cars.map((car) => (
                    <td key={car.id} className="px-5 py-3.5 text-sm">
                      {row.get(car)}
                    </td>
                  ))}
                </tr>
              ))}

              {/* Section separator */}
              <tr>
                <td
                  colSpan={cars.length + 1}
                  className="px-5 py-2 bg-[#1a1a1a] font-condensed font-bold text-xs tracking-widest uppercase text-gold/60"
                >
                  Detailed Specs
                </td>
              </tr>

              {/* Spec sections */}
              {allSections.map((section) => {
                const keys = Object.keys(cars[0].specs[section] || {});
                return keys.map((key) => (
                  <tr
                    key={`${section}-${key}`}
                    className="border-b border-white/10 hover:bg-[#1a1a1a] transition-colors"
                  >
                    <td className="px-5 py-3 text-white/50 italic text-sm">{key}</td>
                    {cars.map((car) => (
                      <td key={car.id} className="px-5 py-3 text-sm">
                        {(car.specs[section] || {})[key] || "—"}
                      </td>
                    ))}
                  </tr>
                ));
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
