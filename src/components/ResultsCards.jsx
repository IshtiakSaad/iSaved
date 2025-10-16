import React from "react";

const ResultsCards = ({ data }) => {
  if (!data.length)
    return (
      <p className="text-center text-gray-400 italic mt-6">
        ⚠️ No device available with the selected configuration.
      </p>
    );

  const minPrice = Math.min(...data.map((d) => d.Price));
  const sortedData = [...data].sort((a, b) =>
    a.Price === minPrice ? -1 : b.Price === minPrice ? 1 : 0
  );
  const best = sortedData[0];

  const columns = Object.keys(data[0]).filter((key) => key !== "PriceDiff");

  const formatHeader = (col) => {
    if (col === "CPUCores") return "CPU Cores";
    if (col === "GPUCores") return "GPU Cores";
    if (col === "NeuralEngine") return "Neural Engine";
    return col.replace(/([a-z])([A-Z])/g, "$1 $2");
  };

  return (
    <>
      <p className="mt-6 text-center text-green-600 text-xl md:text-2xl font-semibold">
        ⭐ Best Value: {best.Model} (${best.Price.toLocaleString()})
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-6 px-2">
        {sortedData.map((row, i) => (
          <div
            key={i}
            className={`
              relative p-5 rounded-2xl
              bg-gradient-to-br from-white/60 to-gray-50/70
              backdrop-blur-md border border-gray-200
              shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1
              ${row.Price === best.Price ? "ring-4 ring-green-300/70" : ""}
            `}
          >
            <h3 className="text-gray-900 text-lg font-semibold mb-2">
              {row.Model}
            </h3>

            <div className="flex flex-col gap-1">
              {columns.map((col) => (
                <p key={col} className="text-gray-700 text-sm">
                  <span className="font-medium">{formatHeader(col)}:</span>{" "}
                  {col === "Price"
                    ? `$${row[col].toLocaleString()}`
                    : row[col]}
                </p>
              ))}
            </div>

            <p className="mt-3 text-green-600 font-medium text-sm">
              Δ vs Cheapest:{" "}
              {row.PriceDiff === 0
                ? "—"
                : `+$${row.PriceDiff.toLocaleString()}`}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ResultsCards;
