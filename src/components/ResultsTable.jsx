import React from "react";

const ResultsTable = ({ data }) => {
  if (!data.length)
    return (
      <p className="text-center text-gray-400 italic my-6">
        ⚠️ No device available with the selected configuration.
      </p>
    );

  const best = data[0];
  const columns = Object.keys(data[0]).filter((key) => key !== "PriceDiff");

  const formatHeader = (col) => {
    if (col === "CPUCores") return "CPU Cores";
    if (col === "GPUCores") return "GPU Cores";
    if (col === "NeuralEngine") return "Neural Engine";
    return col.replace(/([a-z])([A-Z])/g, "$1 $2");
  };

  return (
    <div className="overflow-x-auto rounded-2xl bg-white/60 backdrop-blur-md border border-gray-200 shadow-lg p-4 sm:p-6">
      <p className="mb-6 text-center text-green-600 text-xl font-semibold">
        ⭐ Best Value: {best.Model} (${best.Price.toLocaleString()})
      </p>

      <table className="table-auto min-w-full text-gray-800">
        <thead>
          <tr className="border-b border-gray-300">
            {columns.map((col) => (
              <th
                key={col}
                className="text-left font-semibold py-2 px-3 text-xs sm:text-sm uppercase tracking-wide text-gray-700"
              >
                {formatHeader(col)}
              </th>
            ))}
            <th className="text-left font-semibold py-2 px-3 text-xs sm:text-sm uppercase tracking-wide text-gray-700">
              Δ vs Cheapest
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className={`transition-all ${
                row.Price === best.Price
                  ? "bg-green-50 font-semibold"
                  : "hover:bg-gray-50"
              }`}
            >
              {columns.map((col) => (
                <td
                  key={col}
                  className="py-2 px-3 text-sm sm:text-base whitespace-nowrap"
                >
                  {col === "Price" ? `$${row[col].toLocaleString()}` : row[col]}
                </td>
              ))}
              <td className="py-2 px-3 text-sm sm:text-base whitespace-nowrap text-green-600 font-medium">
                {row.PriceDiff === 0 ? "—" : `+$${row.PriceDiff.toLocaleString()}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
