import React from "react";
import { 
  CheckCircle2, 
  Monitor, 
  Cpu, 
  HardDrive, 
  MemoryStick, 
  Zap 
} from "lucide-react";

const ResultsCards = ({ data }) => {
  if (!data || !data.length) {
    return (
      <div className="flex flex-col items-center justify-center mt-12 text-gray-400">
        <Monitor className="w-12 h-12 mb-2 opacity-20" />
        <p className="italic">⚠️ No device available with the selected configuration.</p>
      </div>
    );
  }

  // Find Min Price
  const minPrice = Math.min(...data.map((d) => d.Price));
  
  // Sort by Price (Low to High)
  const sortedData = [...data].sort((a, b) => a.Price - b.Price);

  return (
    <div className="w-full max-w-7xl mx-auto px-2 py-6">
      
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-6 border-b border-gray-200 pb-4">
        <div className="flex items-center gap-2 text-green-700 font-medium">
          <CheckCircle2 className="w-5 h-5" />
          <span>{data.length} Devices Match Your Needs</span>
        </div>
        <p className="text-gray-400 text-xs sm:text-sm mt-2 md:mt-0">
          Sorted by Effective Price (Low to High)
        </p>
      </div>

      {/* --- Cards Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {sortedData.map((row, i) => {
          const isBestValue = row.Price === minPrice;

          // --- FIXED DATA MAPPING (Bracket Notation for spaces) ---
          
          const ram = row["RAM"];
          const storage = row["Storage"];
          
          // Use bracket notation because keys have spaces: "CPU Cores"
          const cpuCount = row["CPU Cores"] || "?";
          const gpuCount = row["GPU Cores"] || "?";
          
          const screenSize = row["Screen Size"] || "N/A";
          const displayOpt = row["Display Option"] || "Standard";
          
          const processor = row["Processor"] || "Apple Chip";

          // Combine Cores for cleaner UI
          const cpuDisplay = `${cpuCount} CPU / ${gpuCount} GPU`; 

          return (
            <div
              key={i}
              className={`
                relative flex flex-col p-5 rounded-2xl transition-all duration-300
                ${isBestValue 
                  ? "bg-gray-50 border-2 border-emerald-500 shadow-lg scale-[1.02] z-10" 
                  : "bg-white border border-gray-200 hover:shadow-xl hover:-translate-y-1"
                }
              `}
            >
              {/* Floating "Best Value" Badge */}
              {isBestValue && (
                <div className="absolute -top-3 left-0 right-0 mx-auto w-max bg-emerald-500 text-white px-3 py-1 rounded-full text-[10px] tracking-wide font-bold flex items-center gap-1 shadow-sm uppercase">
                  <Zap className="w-3 h-3 fill-current" />
                  Best Value
                </div>
              )}

              {/* Top Row: Icon & Price */}
              <div className="flex justify-between items-start mb-3 mt-2">
                <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                  <Monitor className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
                </div>
                <span className="text-2xl font-bold text-gray-900 tracking-tight">
                  ${row.Price.toLocaleString()}
                </span>
              </div>

              {/* Title Section */}
              <div className="mb-5">
                <h3 className="text-lg font-bold text-gray-900 leading-tight">
                  {row.Model}
                </h3>
                <p className="text-sm text-gray-500 font-medium mt-1">
                  {processor} • 2024
                </p>
              </div>

              {/* Specs Grid (2x2) */}
              <div className="grid grid-cols-2 gap-y-5 gap-x-2 mb-6">
                
                {/* Spec 1: RAM */}
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">MEMORY</p>
                  <div className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
                    <MemoryStick className="w-4 h-4 text-gray-400" />
                    {ram} GB
                  </div>
                </div>

                {/* Spec 2: Storage */}
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">STORAGE</p>
                  <div className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
                    <HardDrive className="w-4 h-4 text-gray-400" />
                    {storage} GB
                  </div>
                </div>

                {/* Spec 3: Cores */}
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">CORES</p>
                  <div className="flex items-center gap-2 text-gray-700 font-semibold text-xs whitespace-nowrap">
                    <Cpu className="w-4 h-4 text-gray-400" />
                    {cpuDisplay}
                  </div>
                </div>

                {/* Spec 4: Screen Size */}
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">SCREEN</p>
                  <div className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
                    <Monitor className="w-4 h-4 text-gray-400" />
                    {screenSize}
                  </div>
                </div>
              </div>

              {/* Footer Tag (Display Option) */}
              <div className="mt-auto pt-4 border-t border-gray-100">
                <span className={`
                  inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border
                  ${displayOpt === "Standard" 
                    ? "bg-blue-50 text-blue-700 border-blue-100" 
                    : "bg-purple-50 text-purple-700 border-purple-100"
                  }
                `}>
                  {displayOpt} Display
                </span>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResultsCards;