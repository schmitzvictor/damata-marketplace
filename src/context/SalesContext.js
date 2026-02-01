"use client";

import { createContext, useContext, useState, useEffect } from "react";

const SalesContext = createContext();

export function SalesProvider({ children }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
      const fetchOrders = async () => {
          try {
              const res = await fetch('/api/orders');
              if (res.ok) {
                  const data = await res.json();
                  setOrders(data);
              }
          } catch (e) { console.error(e); }
      };
      
      fetchOrders();
  }, []);

  const addOrder = async (orderData) => {
    try {
        const res = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        if (res.ok) {
            const newOrder = await res.json();
            setOrders(prev => [newOrder, ...prev]);
        }
    } catch (e) {
        console.error("Add order failed", e);
    }
  };

  return (
    <SalesContext.Provider value={{ orders, addOrder }}>
      {children}
    </SalesContext.Provider>
  );
}

export const useSales = () => useContext(SalesContext);
