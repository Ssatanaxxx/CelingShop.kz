export const API_URL = "http://localhost:3000/api";

// Типы для TypeScript
export interface Service {
  id: number;
  title: string;
  description: string;
  price: string;
  formula: "perSquare" | "perimeterAndSquare";
  pricePerSquare: number;
  pricePerMeter: number | null;
  basePricePerSquare: number;
}

export interface Extra {
  id: number;
  title: string;
  price: string;
  pricePerMeter: number;
  description: string;
}

export interface CalculationRequest {
  serviceId: number;
  length: number;
  width: number;
  extras?: Array<{
    id: number;
    length: number;
  }>;
  calculationMethod?: "perSquare" | "perimeterAndSquare";
}

export interface OrderRequest {
  name: string;
  phone: string;
  email?: string;
  calculationData: unknown; // изменил из any на unknown
  comment?: string;
}

// GET запросы
export async function getServices(): Promise<Service[]> {
  const res = await fetch(`${API_URL}/services`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
}

export async function getExtras(): Promise<Extra[]> {
  const res = await fetch(`${API_URL}/extras`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
}

// POST запросы
export async function calculatePrice(data: CalculationRequest) {
  const res = await fetch(`${API_URL}/calculate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
}

export async function createOrder(data: OrderRequest) {
  const res = await fetch(`${API_URL}/calculate/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
}