"use client";

import Link from 'next/link';
import styles from './Header.module.css';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { cartCount } = useCart();
  
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.navWrapper}>
          <Link href="/" className={styles.logo}>
            <span className={styles.mushroomIcon}>🍄</span>
            Da Mata Artesanal
          </Link>
          
          <nav className={styles.nav}>
            <Link href="/" className={styles.navLink}>Início</Link>
            <Link href="/quem-somos" className={styles.navLink}>Quem Somos</Link>
            <Link href="/produtos" className={styles.navLink}>Produtos</Link>
            <Link href="/blog" className={styles.navLink}>Blog</Link>
            <Link href="/admin" className={styles.navLink}>Admin</Link>
          </nav>

          <div className={styles.actions}>
            <Link href="/carrinho" className={styles.cartBtn}>
              🛒 <span className={styles.cartCount}>{cartCount}</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
