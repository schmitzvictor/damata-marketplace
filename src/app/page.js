"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./page.module.css";
import Link from "next/link";
import { useProducts } from "@/context/ProductContext";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const { products, getFeaturedProducts } = useProducts();
  const featuredProducts = getFeaturedProducts();

  // Group products by category
  const getProductsByCategory = (category) => {
    return products.filter(p => 
      p.category?.toLowerCase() === category.toLowerCase()
    ).slice(0, 6);
  };

  // Get unique categories
  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];

  return (
    <div className={styles.page}>
      <Header />
      
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Damata Grow</h1>
            <p className={styles.heroSubtitle}>
              Roupas feitas com a alma da natureza. Estilo, conforto e consciência ambiental em cada peça.
            </p>
            <div className={styles.heroButtons}>
              <Link href="/produtos" className={styles.heroBtn}>
                Ver Coleção
              </Link>
              <Link href="/quem-somos" className={styles.heroBtnOutline}>
                Quem Somos
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className={styles.section}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Mais Vendidos</h2>
              <Link href="/produtos" className={styles.viewAll}>
                Ver todos
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
            <div className={styles.productGrid}>
              {featuredProducts.slice(0, 6).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Category Sections */}
        {categories.slice(0, 3).map(category => {
          const categoryProducts = getProductsByCategory(category);
          if (categoryProducts.length === 0) return null;
          
          return (
            <section key={category} className={styles.section}>
              <div className="container">
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>{category}</h2>
                  <Link href={`/produtos?categoria=${encodeURIComponent(category)}`} className={styles.viewAll}>
                    Ver todos
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </Link>
                </div>
                <div className={styles.productGrid}>
                  {categoryProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* CTA Banner Section */}
        <section className={styles.ctaBanner}>
          <div className="container">
            <div className={styles.ctaContent}>
              <h2>Conecte-se com a Natureza</h2>
              <p>Peças exclusivas, feitas à mão com materiais sustentáveis</p>
              <Link href="/produtos" className={styles.ctaBtn}>
                Explorar Produtos
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
