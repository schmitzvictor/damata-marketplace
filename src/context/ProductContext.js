"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
        const res = await fetch('/api/products');
        if (res.ok) {
            const data = await res.json();
            setProducts(data);
        }
    } catch (err) {
        console.error("Failed to load products", err);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (product) => {
    // Optimistic UI or wait? Let's wait for simplicity
    try {
        const res = await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });
        if (res.ok) {
            const newProduct = await res.json();
            setProducts(prev => [newProduct, ...prev]);
        }
    } catch (e) {
        console.error("Add failed", e);
    }
  };

  const updateProduct = async (id, updatedData) => {
    try {
        const res = await fetch(`/api/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });
        if (res.ok) {
            const updated = await res.json();
            setProducts(prev => prev.map(p => p.id === id ? updated : p));
        }
    } catch (e) {
        console.error("Update failed", e);
    }
  };

  const deleteProduct = async (id) => {
    try {
        const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
        if (res.ok) {
            setProducts(prev => prev.filter(p => p.id !== id));
        }
    } catch (e) {
        console.error("Delete failed", e);
    }
  };

  const getFeaturedProducts = () => products.filter(p => p.featured);
  const getProductById = (id) => products.find(p => p.id === parseInt(id));

  return (
    <ProductContext.Provider value={{ 
      products, 
      addProduct, 
      updateProduct, 
      deleteProduct,
      getFeaturedProducts,
      getProductById,
      loading
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);
