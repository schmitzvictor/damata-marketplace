"use client";

import { createContext, useContext, useState, useEffect } from "react";

const SalesContext = createContext();

const initialOrders = [
    { id: 101, date: "2024-03-10", customer: "João Silva", total: 299.80, status: "Pago", items: 2 },
    { id: 102, date: "2024-03-09", customer: "Maria Souza", total: 149.90, status: "Enviado", items: 1 },
    { id: 103, date: "2024-03-08", customer: "Pedro Santos", total: 450.00, status: "Entregue", items: 3 },
];

export function SalesProvider({ children }) {
  const [orders, setOrders] = useState(initialOrders);

  // Load from LocalStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem("daMataOrders");
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error("Failed to parse orders", e);
      }
    }
  }, []);

  // Save to LocalStorage on change
  useEffect(() => {
    localStorage.setItem("daMataOrders", JSON.stringify(orders));
  }, [orders]);

  const addOrder = (orderData) => {
    const newId = Math.max(...orders.map(o => o.id), 100) + 1;
    const newOrder = { 
        ...orderData, 
        id: newId, 
        date: new Date().toISOString().split('T')[0],
        status: "Pago" // Auto-set to paid for mock
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  return (
    <SalesContext.Provider value={{ orders, addOrder }}>
      {children}
    </SalesContext.Provider>
  );
}

export const useSales = () => useContext(SalesContext);
