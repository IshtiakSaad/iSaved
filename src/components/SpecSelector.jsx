import React from "react";

const SpecSelector = ({
  specs,
  setSpecs,
  onSearch,
  processorOptions,
  ramOptions,
  storageOptions,
}) => {
  const selectClass =
    "border border-gray-300 bg-white text-gray-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 transition";

  const buttonClass =
    "bg-green-600 hover:bg-green-500 text-white font-medium rounded-lg px-6 py-2 text-sm shadow-sm transition";

  return (
    <div className="flex flex-wrap justify-center gap-4">
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

      <button onClick={onSearch} className={buttonClass}>
        Match
      </button>
    </div>
  );
};

export default SpecSelector;
