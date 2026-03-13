"use client";
import { useState, useEffect } from "react";
import type { Car } from "@/lib/cars";

interface TechSpecPanelProps {
  car: Car | null;
  onClose: () => void;
}

function AccordionItem({ title, rows }: { title: string; rows: Record<string, string> }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-5 text-left"
      >
        <span className="font-bold italic text-[#f0a500] text-base">{title}</span>
        <span
          className="text-[#f0a500] text-xl leading-none font-light ml-4 flex-shrink-0"
          style={{ fontFamily: "sans-serif" }}
        >
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <div className="pb-4 space-y-2">
          {Object.entries(rows).map(([k, v]) => (
            <div key={k} className="flex justify-between gap-6 text-sm">
              <span className="text-white/50 italic">{k}</span>
              <span className="text-white font-medium text-right">{v}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function TechSpecPanel({ car, onClose }: TechSpecPanelProps) {
  // Prevent background scroll when open
  useEffect(() => {
    if (car) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [car]);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-40 transition-opacity duration-300"
        style={{ opacity: car ? 1 : 0, pointerEvents: car ? "auto" : "none" }}
        onClick={onClose}
      />

      {/* Modal drawer — slides up from bottom on mobile, right on desktop */}
      <div
        className="fixed inset-0 z-50 flex items-stretch justify-end pointer-events-none"
      >
        <div
          className="w-full max-w-[480px] h-full bg-[#000] flex flex-col pointer-events-auto"
          style={{
            transform: car ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.28s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          {car && (
            <>
              {/* Header — black bg, white title, gold X */}
              <div className="flex justify-between items-center px-6 py-6 flex-shrink-0 bg-[#000]">
                <h2
                  className="text-white font-light text-2xl tracking-wide"
                  style={{ fontFamily: "var(--font-barlow), sans-serif", fontWeight: 300 }}
                >
                  Technical Specifications
                </h2>
                <button
                  onClick={onClose}
                  className="text-[#f0a500] text-2xl leading-none hover:opacity-70 transition-opacity w-8 h-8 flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              {/* Hero stats — light grey background exactly like Figma */}
              <div
                className="flex-shrink-0 px-6 py-6"
                style={{ background: "#c8c8c8" }}
              >
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  {[
                    { val: `${car.hp} HP`, lbl: "Horsepower" },
                    { val: `${car.groundClearance} IN`, lbl: "Ground Clearance" },
                    { val: `${car.torque} NM`, lbl: "Torque" },
                    { val: `${car.cc} CC`, lbl: "Engine" },
                  ].map((item) => (
                    <div key={item.lbl}>
                      <p
                        className="text-[#111] font-bold italic text-lg leading-tight"
                        style={{ fontFamily: "var(--font-barlow), sans-serif" }}
                      >
                        {item.val}
                      </p>
                      <p
                        className="text-[#333] italic text-sm"
                        style={{ fontFamily: "var(--font-barlow), sans-serif" }}
                      >
                        {item.lbl}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accordion — black bg, scrollable */}
              <div className="flex-1 overflow-y-auto bg-[#000] px-6">
                {Object.entries(car.specs).map(([section, rows]) => (
                  <AccordionItem key={section} title={section} rows={rows} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
