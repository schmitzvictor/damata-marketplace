"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { products as initialProducts } from "@/lib/products";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);

  // Load from LocalStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem("daMataProducts");
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (e) {
        console.error("Failed to parse products", e);
      }
    }
  }, []);

  // Save to LocalStorage on change
  useEffect(() => {
    localStorage.setItem("daMataProducts", JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    // Generate new ID
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    const newProduct = { ...product, id: newId };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id, updatedData) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
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
      getProductById
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);
