"use client";
import { useState, useEffect } from "react";
import { loadWasm } from "./utils/wasmLoader";

export default function Home() {
  const [factorial, setFactorial] = useState<number | null>(null);
  const [input, setInput] = useState<string>("");
  const [wasmExports, setWasmExports] = useState<any>(null);

  useEffect(() => {
    loadWasm().then((exports) => setWasmExports(exports));
  }, []);

  const handleCalculate = () => {
    if (wasmExports && input) {
      const num = parseInt(input, 10);
      const result = wasmExports.factorial(num);
      setFactorial(result);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>WebAssembly Factorial Calculator</h1>
      <input  className="text-black"
        type="number"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a number"
        style={{ padding: "10px", fontSize: "16px"}}
      />
      <button
        onClick={handleCalculate}
        style={{
          marginLeft: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Calculate
      </button>
      {factorial !== null && (
        <h2>
          Factorial: <span>{factorial}</span>
        </h2>
      )}
    </div>
  );
}
