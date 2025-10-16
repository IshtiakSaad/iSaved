import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import appleCSV from "./assets/apple-dataset.csv?url";
import SpecSelector from "./components/SpecSelector";
import ResultsTable from "./components/ResultsTable";
import ResultsCards from "./components/ResultsCards";
import Footer from "./components/Footer";
import Hero from "./components/Hero";

const App = () => {
  const [data, setData] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [specs, setSpecs] = useState({ processor: "", ram: "", storage: "" });
  const [view, setView] = useState("table");

  const [processorOptions, setProcessorOptions] = useState([]);
  const [ramOptions, setRamOptions] = useState([]);
  const [storageOptions, setStorageOptions] = useState([]);

  const normalize = (str) =>
    str
      .replace(/\s+/g, " ")
      .replace(/\u00A0/g, " ")
      .trim()
      .toLowerCase();

  // Load Dataset
  useEffect(() => {
    Papa.parse(appleCSV, {
      download: true,
      header: true,
      complete: (result) => {
        const cleaned = result.data
          .filter((row) => row.Price && row.Processor && row.RAM && row.Storage)
          .map((row) => {
            const price = parseFloat(
              row.Price.replace(/,/g, "").replace(/"/g, "")
            );
            const ram = parseInt(row.RAM.replace("GB", "").trim());
            let storage = 0;
            if (row.Storage.includes("TB")) {
              storage = parseFloat(row.Storage.replace("TB", "").trim()) * 1000;
            } else if (row.Storage.includes("GB")) {
              storage = parseInt(row.Storage.replace("GB", "").trim());
            }
            return {
              ...row,
              Price: price,
              RAM: ram,
              Storage: storage,
              Processor: row.Processor.trim(),
            };
          });

        setData(cleaned);

        setProcessorOptions([...new Set(cleaned.map((d) => d.Processor))]);
        setRamOptions(
          [...new Set(cleaned.map((d) => d.RAM))].sort((a, b) => a - b)
        );
        setStorageOptions(
          [...new Set(cleaned.map((d) => d.Storage))].sort((a, b) => a - b)
        );
      },
    });
  }, []);

  //   Filter Logic
  const handleFilter = () => {
    if (!specs.processor || !specs.ram || !specs.storage) return;

    setClicked(true);

    const matches = data.filter(
      (item) =>
        (!specs.processor ||
          normalize(item.Processor) === normalize(specs.processor)) &&
        (!specs.ram || item.RAM === parseInt(specs.ram)) &&
        (!specs.storage || item.Storage === parseInt(specs.storage))
    );

    setFiltered(
      matches.length
        ? matches
            .map((m) => ({
              ...m,
              PriceDiff: m.Price - Math.min(...matches.map((x) => x.Price)),
            }))
            .sort((a, b) => a.Price - b.Price)
        : []
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6 font-sans">
      <div className="mx-auto">
        {/* Header */}
        <Hero/>

        {/* Spec Selector */}
        <div className="mb-8">
          <SpecSelector
            specs={specs}
            setSpecs={setSpecs}
            onSearch={handleFilter}
            processorOptions={processorOptions}
            ramOptions={ramOptions}
            storageOptions={storageOptions}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          />
        </div>

        {/* View Toggle */}
        {filtered.length > 0 && (
          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={() => setView("table")}
              className={`px-4 py-2 rounded-lg font-medium ${
                view === "table"
                  ? "bg-black text-white"
                  : "bg-base-300 text-black border-1 border-black border-solid"
              }`}
            >
              Table View
            </button>
            <button
              onClick={() => setView("cards")}
              className={`px-4 py-2 rounded-lg font-medium ${
                view === "cards"
                  ? "bg-black text-white"
                  : "bg-base-300 text-black border-1 border-black border-solid"
              }`}
            >
              Card View
            </button>
          </div>
        )}

        {/* Results Table */}
        {clicked ? (
          <>
            {/* Render according to selected view */}
            {view === "table" ? (
              <ResultsTable data={filtered} />
            ) : (
              <ResultsCards data={filtered} />
            )}
          </>
        ) : (
          " "
        )}


        {filtered.length === 0 && (
          <p className="text-center text-gray-500 mt-6 text-sm">
            Select specs and hit{" "}
            <span className="font-medium text-gray-800">Match</span>. Just like
            that!
          </p>
        )}

        {/* Footer Credit & Copywrite */}
        <Footer />
      </div>
    </div>
  );
};

export default App;
