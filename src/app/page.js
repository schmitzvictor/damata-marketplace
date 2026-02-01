"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./page.module.css";
import Link from "next/link";
import { useProducts } from "@/context/ProductContext";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const { getFeaturedProducts } = useProducts();
  const featuredProducts = getFeaturedProducts();
  return (
    <div className={styles.page}>
      <Header />
      
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <h1 className={styles.title}>Damata Grow</h1>
            <p className={styles.subtitle}>
              Roupas feitas com a alma da natureza. Estilo, conforto e consciência ambiental em cada peça.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/produtos" className={styles.heroBtn}>
                Ver Coleção
              </Link>
            </div>
          </div>
        </section>

        <div className="container">
          <h2 className={styles.sectionTitle}>Destaques da Floresta</h2>
          <div className={styles.grid}>
            {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
