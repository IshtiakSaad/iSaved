import React from "react";

const ResultsTable = ({ data }) => {
  if (!data.length)
    return (
      <p className="text-center text-gray-500 italic">
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
    <div className="overflow-x-auto rounded-xl bg-white shadow-sm border border-gray-200 p-4">
      <table className="table-auto w-full text-gray-800">
        <thead>
          <tr className="border-b border-gray-300">
            {columns.map((col) => (
              <th
                key={col}
                className="text-left font-medium py-2 px-3 text-sm uppercase tracking-wide"
              >
                {formatHeader(col)}
              </th>
            ))}
            <th className="text-left font-medium py-2 px-3 text-sm uppercase tracking-wide">
              Δ vs Cheapest
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className={`${
                row.Price === best.Price
                  ? "bg-green-50 font-semibold"
                  : "hover:bg-gray-50 transition"
              }`}
            >
              {columns.map((col) => (
                <td key={col} className="py-2 px-3 text-sm">
                  {col === "Price" ? `$${row[col].toLocaleString()}` : row[col]}
                </td>
              ))}
              <td className="py-2 px-3 text-sm">
                {row.PriceDiff === 0 ? "—" : `+$${row.PriceDiff.toLocaleString()}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-4 text-center text-gray-700 text-sm">
        ⭐ Best Value: {best.Model} (${best.Price.toLocaleString()})
      </p>
    </div>
  );
};

export default ResultsTable;
