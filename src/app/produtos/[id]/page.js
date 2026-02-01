"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useProducts } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import styles from "./page.module.css";
import { notFound } from "next/navigation";

export default function ProductPage({ params }) {
  const resolvedParams = use(params);
  const { getProductById } = useProducts();
  const product = getProductById(resolvedParams.id);
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);

  // Effect to update size if product changes
  useEffect(() => {
    if (product && product.variants?.length > 0) {
        setSelectedSize(product.variants[0].size);
    }
  }, [product]);

  useEffect(() => {
      if (product && selectedSize) {
          const variant = product.variants?.find(v => v.size === selectedSize);
          setSelectedVariant(variant);
      }
  }, [product, selectedSize]);

  if (!product) {
    return notFound();
  }

  const handleAddToCart = () => {
      if (!selectedVariant || selectedVariant.stock < 1) {
          addToast("Produto indisponível neste tamanho.", "error");
          return;
      }
      addToCart({ 
          ...product, 
          size: selectedSize,
      });
      addToast("Produto adicionado ao carrinho!");
  };

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
                    {product.variants?.map(v => (
                        <button 
                            key={v.id}
                            className={`${styles.sizeBtn} ${selectedSize === v.size ? styles.active : ''} ${v.stock === 0 ? styles.disabled : ''}`}
                            onClick={() => v.stock > 0 && setSelectedSize(v.size)}
                            disabled={v.stock === 0}
                            title={v.stock === 0 ? "Indisponível" : `${v.stock} unidades disponíveis`}
                        >
                            {v.size}
                        </button>
                    ))}
                </div>
            </div>

            <button 
                className={styles.addToCartBtn}
                onClick={handleAddToCart}
                disabled={!selectedVariant || selectedVariant.stock === 0}
                style={{ opacity: (!selectedVariant || selectedVariant.stock === 0) ? 0.5 : 1 }}
            >
                {(!selectedVariant || selectedVariant.stock === 0) ? "Esgotado neste tamanho" : "Adicionar ao Carrinho"}
            </button>
            
            <div className={styles.meta}>
                <p>Categoria: {product.category}</p>
                <p>Estoque: {selectedVariant ? `${selectedVariant.stock} un.` : 'Selecione um tamanho'}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
