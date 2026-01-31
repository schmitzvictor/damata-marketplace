"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/context/ProductContext";
import styles from "./page.module.css";

export default function Marketplace() {
  const { products: allProducts } = useProducts();
  
  // States for filters
  const [maxPrice, setMaxPrice] = useState(200);
  const [selectedSize, setSelectedSize] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  const filteredProducts = useMemo(() => {
    return allProducts
      .filter(product => {
        const matchPrice = product.price <= maxPrice;
        const matchSize = selectedSize ? product.size === selectedSize : true;
        return matchPrice && matchSize;
      })
      .sort((a, b) => {
        if (sortOrder === "newest") {
          return new Date(b.date) - new Date(a.date);
        } else if (sortOrder === "price_asc") {
          return a.price - b.price;
        } else if (sortOrder === "price_desc") {
          return b.price - a.price;
        }
        return 0;
      });
  }, [allProducts, maxPrice, selectedSize, sortOrder]);

  return (
    <div className={styles.page}>
      <Header />
      <main className="container">
        <h1 className={styles.pageTitle}>Nossa Coleção</h1>
        
        <div className={styles.layout}>
          {/* Sidebar Filters */}
          <aside className={styles.sidebar}>
            <div className={styles.filterGroup}>
              <label className={styles.label}>Ordenar por</label>
              <select 
                value={sortOrder} 
                onChange={(e) => setSortOrder(e.target.value)}
                className={styles.select}
              >
                <option value="newest">Lançamentos</option>
                <option value="price_asc">Menor Preço</option>
                <option value="price_desc">Maior Preço</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.label}>
                Preço Máximo: R$ {maxPrice}
              </label>
              <input 
                type="range" 
                min="0" 
                max="300" 
                step="10" 
                value={maxPrice} 
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className={styles.range}
              />
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.label}>Tamanho</label>
              <select 
                value={selectedSize} 
                onChange={(e) => setSelectedSize(e.target.value)}
                className={styles.select}
              >
                <option value="">Todos</option>
                <option value="P">P</option>
                <option value="M">M</option>
                <option value="G">G</option>
                <option value="GG">GG</option>
              </select>
            </div>
            
            <div className={styles.resultsCount}>
              {filteredProducts.length} produtos encontrados
            </div>
          </aside>

          {/* Product Grid */}
          <section className={styles.grid}>
             {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
             ) : (
                <p>Nenhum produto encontrado com estes filtros.</p>
             )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
