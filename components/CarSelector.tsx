"use client";
import { useState, useMemo } from "react";
import type { Car, CarCategory, EngineType } from "@/lib/cars";
import Sidebar, { type FilterState } from "./Sidebar";
import CarCard from "./CarCard";
import TechSpecPanel from "./TechSpecPanel";
import CompareBar from "./CompareBar";
import CompareModal from "./CompareModal";

interface CarSelectorProps {
  cars: Car[];
}

const ALL_USAGE = new Set(["Family Car", "City Car", "Off-Road"]);
const ALL_CATS = new Set<CarCategory>(["SEDANS", "SUVS", "HATCHBACKS"]);

export default function CarSelector({ cars }: CarSelectorProps) {
  const [filters, setFilters] = useState<FilterState>({
    categories: new Set(ALL_CATS),
    usage: new Set(ALL_USAGE),
    years: new Set<number>(),
    engines: new Set<EngineType>(),
  });

  const [specCar, setSpecCar] = useState<Car | null>(null);
  const [compareList, setCompareList] = useState<Car[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Filter logic
  const filtered = useMemo(() => {
    return cars.filter((car) => {
      if (!filters.categories.has(car.category)) return false;
      // Usage: if any usage checked, car must match one
      if (filters.usage.size > 0 && filters.usage.size < ALL_USAGE.size) {
        if (!car.usage.some((u) => filters.usage.has(u))) return false;
      }
      // Year: if any checked, must match
      if (filters.years.size > 0 && !filters.years.has(car.year)) return false;
      // Engine: if any checked, must match
      if (filters.engines.size > 0 && !filters.engines.has(car.engine)) return false;
      return true;
    });
  }, [cars, filters]);

  // Filter handlers
  const toggleCategory = (cat: CarCategory) => {
    setFilters((prev) => {
      const next = new Set(prev.categories);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return { ...prev, categories: next };
    });
  };

  const toggleUsage = (u: string) => {
    setFilters((prev) => {
      const next = new Set(prev.usage);
      next.has(u) ? next.delete(u) : next.add(u);
      return { ...prev, usage: next };
    });
  };

  const toggleYear = (y: number) => {
    setFilters((prev) => {
      const next = new Set(prev.years);
      next.has(y) ? next.delete(y) : next.add(y);
      return { ...prev, years: next };
    });
  };

  const toggleEngine = (e: EngineType) => {
    setFilters((prev) => {
      const next = new Set(prev.engines);
      next.has(e) ? next.delete(e) : next.add(e);
      return { ...prev, engines: next };
    });
  };

  const clearAll = () => {
    setFilters({
      categories: new Set(ALL_CATS),
      usage: new Set(ALL_USAGE),
      years: new Set(),
      engines: new Set(),
    });
  };

  // Compare handlers
  const toggleCompare = (car: Car, checked: boolean) => {
    if (checked) {
      if (compareList.length >= 3) {
        alert("You can compare up to 3 models.");
        return;
      }
      setCompareList((prev) => [...prev, car]);
    } else {
      setCompareList((prev) => prev.filter((c) => c.id !== car.id));
    }
  };

  const removeFromCompare = (car: Car) => {
    setCompareList((prev) => prev.filter((c) => c.id !== car.id));
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Page header */}
      <header className="border-b border-white/10 text-center py-6 flex-shrink-0">
        <h1 className="font-condensed font-extrabold text-4xl tracking-[0.12em] uppercase">
          Select Your Model
        </h1>
      </header>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          filters={filters}
          onCategoryToggle={toggleCategory}
          onUsageToggle={toggleUsage}
          onYearToggle={toggleYear}
          onEngineToggle={toggleEngine}
          onClearAll={clearAll}
        />

        {/* Grid */}
        <main
          className="flex-1 overflow-y-auto p-6"
          style={{ paddingBottom: compareList.length > 0 ? "80px" : "24px" }}
        >
          {filtered.length === 0 ? (
            <div className="flex items-center justify-center h-full text-white/30 italic text-lg">
              No models match your filters.
            </div>
          ) : (
            <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
              {filtered.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  isCompared={compareList.some((c) => c.id === car.id)}
                  onSelectModel={(c) => alert(`You selected: ${c.name}\nStarting at ${c.price}`)}
                  onToggleCompare={toggleCompare}
                  onOpenSpecs={setSpecCar}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Tech Spec Panel */}
      <TechSpecPanel car={specCar} onClose={() => setSpecCar(null)} />

      {/* Compare Bar */}
      <CompareBar
        compareList={compareList}
        onRemove={removeFromCompare}
        onCompare={() => setShowCompareModal(true)}
      />

      {/* Compare Modal */}
      {showCompareModal && (
        <CompareModal
          cars={compareList}
          onClose={() => setShowCompareModal(false)}
        />
      )}
    </div>
  );
}
