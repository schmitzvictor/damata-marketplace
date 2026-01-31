"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useProducts } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";
import styles from "./page.module.css";
import { notFound } from "next/navigation";

export default function ProductPage({ params }) {
  const resolvedParams = use(params);
  const { getProductById } = useProducts();
  const product = getProductById(resolvedParams.id);
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product?.size || "M");

  if (!product) {
    return notFound();
  }

  // Effect to update size if product changes
  useEffect(() => {
    setSelectedSize(product.size);
  }, [product]);

  return (
    <div className={styles.page}>
      <Header />
      <main className="container">
        <div className={styles.productLayout}>
          <div className={styles.imageWrapper}>
            <img src={product.image} alt={product.name} className={styles.image} />
          </div>
          
          <div className={styles.details}>
            <h1 className={styles.title}>{product.name}</h1>
            <p className={styles.price}>R$ {product.price.toFixed(2).replace('.', ',')}</p>
            
            <p className={styles.description}>
                Uma peça única feita artesanalmente, trazendo o conforto da floresta para o seu dia a dia.
                Produzida com tecidos sustentáveis e muito carinho.
            </p>

            <div className={styles.options}>
                <label className={styles.label}>Tamanho</label>
                <div className={styles.sizeSelector}>
                    {["P", "M", "G", "GG"].map(size => (
                        <button 
                            key={size}
                            className={`${styles.sizeBtn} ${selectedSize === size ? styles.active : ''}`}
                            onClick={() => setSelectedSize(size)}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            <button 
                className={styles.addToCartBtn}
                onClick={() => {
                    addToCart({ ...product, size: selectedSize });
                    alert("Produto adicionado ao carrinho!");
                }}
            >
                Adicionar ao Carrinho
            </button>
            
            <div className={styles.meta}>
                <p>Categoria: {product.category}</p>
                <p>Estoque: Disponível</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
