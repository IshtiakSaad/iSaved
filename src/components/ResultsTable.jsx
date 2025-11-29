import React from "react";
import { 
  CheckCircle2, 
  Monitor, 
  Cpu, 
  HardDrive, 
  MemoryStick, 
  Zap,
  LayoutGrid,
  DollarSign,
  TrendingUp,
  Box
} from "lucide-react";

const ResultsTable = ({ data }) => {
  if (!data || !data.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
        <Monitor className="w-12 h-12 mb-2 opacity-20" />
        <p className="italic">⚠️ No device available with the selected configuration.</p>
      </div>
    );
  }

  // Logic: Sort by Price (Low to High) ensuring best value is top
  const sortedData = [...data].sort((a, b) => a.Price - b.Price);
  const best = sortedData[0];
  
  // Dynamic Columns: Exclude PriceDiff and Price (we will manually add them at the end for styling)
  const columns = Object.keys(sortedData[0]).filter(
    (key) => key !== "PriceDiff" && key !== "Price"
  );

  // Helper: Format Header Text
  const formatHeader = (col) => {
    if (col === "CPUCores") return "CPU";
    if (col === "GPUCores") return "GPU";
    if (col === "NeuralEngine") return "Neural";
    if (col === "RAM") return "Memory";
    // Split camelCase
    return col.replace(/([a-z])([A-Z])/g, "$1 $2");
  };

  // Helper: Get Icon based on column name (Case insensitive check)
  const getHeaderIcon = (colName) => {
    const col = colName.toLowerCase();
    if (col.includes("cpu") || col.includes("processor")) return <Cpu className="w-4 h-4" />;
    if (col.includes("gpu")) return <LayoutGrid className="w-4 h-4" />;
    if (col.includes("neural")) return <Zap className="w-4 h-4" />;
    if (col.includes("ram") || col.includes("memory")) return <MemoryStick className="w-4 h-4" />;
    if (col.includes("storage")) return <HardDrive className="w-4 h-4" />;
    if (col.includes("screen") || col.includes("display")) return <Monitor className="w-4 h-4" />;
    if (col.includes("model")) return <Box className="w-4 h-4" />;
    return null;
  };

  return (
    <div className="w-full max-w-11/12 mx-auto">
      
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

      <div className="overflow-hidden rounded-2xl bg-white shadow-xl border border-gray-200/60 ring-1 ring-black/5">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            
            {/* --- Table Head --- */}
            <thead className="bg-gray-50/50 border-b border-gray-200">
              <tr>
                {columns.map((col) => (
                  <th key={col} className="text-left py-4 px-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                      {getHeaderIcon(col)}
                      {formatHeader(col)}
                    </div>
                  </th>
                ))}
                
                {/* Manual Price Column */}
                <th className="text-left py-4 px-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    <DollarSign className="w-4 h-4" />
                    Price
                  </div>
                </th>

                {/* Manual Diff Column */}
                <th className="text-left py-4 px-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    <TrendingUp className="w-4 h-4" />
                    Δ vs Best
                  </div>
                </th>
              </tr>
            </thead>

            {/* --- Table Body --- */}
            <tbody className="divide-y divide-gray-100">
              {sortedData.map((row, i) => {
                const isBestValue = row.Price === best.Price;

                return (
                  <tr
                    key={i}
                    className={`
                      group transition-colors duration-200
                      ${isBestValue 
                        ? "bg-emerald-50/30 hover:bg-emerald-50/60" 
                        : "bg-white hover:bg-gray-50"
                      }
                    `}
                  >
                    {/* Dynamic Data Columns */}
                    {columns.map((col) => (
                      <td key={col} className="py-4 px-6 text-sm text-gray-700 whitespace-nowrap">
                        {/* Special styling for Model Name */}
                        {col === "Model" ? (
                          <div className="flex items-center gap-2">
                             <span className="font-bold text-gray-900 text-base">{row[col]}</span>
                             {isBestValue && (
                               <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide flex items-center gap-1">
                                 <Zap className="w-3 h-3 fill-current" /> Best Value
                               </span>
                             )}
                          </div>
                        ) : (
                          // Render other cells
                          <span className="font-medium text-gray-600">
                            {row[col]}
                            {/* Append units intelligently if missing */}
                            {(col === "RAM" || col === "Storage") && typeof row[col] === 'number' ? " GB" : ""}
                          </span>
                        )}
                      </td>
                    ))}

                    {/* Price Column */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className={`text-lg font-bold tracking-tight ${isBestValue ? "text-emerald-700" : "text-gray-900"}`}>
                        ${row.Price.toLocaleString()}
                      </div>
                    </td>

                    {/* Diff Column */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="text-sm font-semibold">
                        {row.PriceDiff === 0 ? (
                          <span className="text-gray-400">—</span>
                        ) : (
                          <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                            +${row.PriceDiff.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResultsTable;