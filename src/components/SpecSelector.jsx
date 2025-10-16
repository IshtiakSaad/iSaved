import React from "react";

const SpecSelector = ({
  specs,
  setSpecs,
  onSearch,
  processorOptions = [],
  ramOptions = [],
  storageOptions = [],
}) => {
  const selectClass =
    "border border-gray-300 bg-white text-gray-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 transition w-full sm:w-auto";

  const buttonClass =
    "bg-black hover:bg-gray-700 text-white font-medium rounded-lg px-6 py-2 text-sm shadow-sm transition w-full sm:w-auto";

  return (
    <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
      {/* Processor */}
      <select
        className={selectClass}
        value={specs.processor}
        onChange={(e) => setSpecs({ ...specs, processor: e.target.value })}
      >
        <option value="">Processor</option>
        {processorOptions.map((p) => (
          <option key={p}>{p}</option>
        ))}
      </select>

      {/* RAM */}
      <select
        className={selectClass}
        value={specs.ram}
        onChange={(e) => setSpecs({ ...specs, ram: e.target.value })}
      >
        <option value="">RAM</option>
        {ramOptions.map((r) => (
          <option key={r}>{r}</option>
        ))}
      </select>

      {/* Storage */}
      <select
        className={selectClass}
        value={specs.storage}
        onChange={(e) => setSpecs({ ...specs, storage: e.target.value })}
      >
        <option value="">Storage (GB)</option>
        {storageOptions.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>

      {/* Match Button */}
      <button onClick={onSearch} className={buttonClass}>
        Match
      </button>
    </div>
  );
};

export default SpecSelector;
