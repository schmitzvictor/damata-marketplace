"use client";

import Link from 'next/link';
import styles from './Header.module.css';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';
import { useState } from 'react';
import AuthModal from './AuthModal';

export default function Header() {
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.navWrapper}>
            <Link href="/" className={styles.logo}>
              <span className="material-symbols-outlined" style={{ color: 'var(--primary-green)' }}>eco</span>
              Damata Grow
            </Link>
            
            <nav className={styles.nav}>
              <Link href="/" className={styles.navLink}>Início</Link>
              <Link href="/quem-somos" className={styles.navLink}>Quem Somos</Link>
              <Link href="/produtos" className={styles.navLink}>Produtos</Link>
              <Link href="/blog" className={styles.navLink}>Blog</Link>
            </nav>

            <div className={styles.actions}>
              <button 
                onClick={toggleTheme} 
                className="icon-btn"
                title={theme === 'light' ? 'Modo escuro' : 'Modo claro'}
              >
                <span className="material-symbols-outlined">
                  {theme === 'light' ? 'dark_mode' : 'light_mode'}
                </span>
              </button>

              <button 
                onClick={() => setShowAuthModal(true)} 
                className="icon-btn"
                title="Entrar / Cadastrar"
              >
                <span className="material-symbols-outlined">person</span>
              </button>

              <Link href="/carrinho" className={styles.cartBtn}>
                <span className="material-symbols-outlined">shopping_cart</span>
                <span className={styles.cartCount}>{cartCount}</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </>
  );
}
