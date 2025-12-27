console.log("DEBUG: Loading config.ts");
console.log("DEBUG: import.meta.env.MODE =", import.meta.env.MODE);
console.log("DEBUG: import.meta.env.VITE_API_URL =", import.meta.env.VITE_API_URL);

const config = {
  apiUrl: "/api"  // Фиксируем для Docker
};

console.log("DEBUG: config.apiUrl =", config.apiUrl);
export default config;
