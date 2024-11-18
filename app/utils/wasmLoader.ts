export async function loadWasm() {
    const response = await fetch("/factorial.wasm");
    const buffer = await response.arrayBuffer();
    const wasmModule = await WebAssembly.instantiate(buffer);
    return wasmModule.instance.exports;
  }