"use client";

import Link from 'next/link';
import styles from './Header.module.css';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { useProducts } from '@/context/ProductContext';
import { useState, useRef, useEffect } from 'react';
import AuthModal from './AuthModal';

export default function Header() {
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { user, logout, loading } = useAuth();
  const { products } = useProducts();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const userMenuRef = useRef(null);
  const navRef = useRef(null);

  // Get unique categories
  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
  };

  const getFirstName = (name) => {
    if (!name) return 'Usuário';
    return name.split(' ')[0];
  };

  const handleDropdownEnter = (menu) => {
    setActiveDropdown(menu);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.navWrapper}>
            <Link href="/" className={styles.logo}>
              <span className="material-symbols-outlined" style={{ color: 'var(--primary-green)' }}>eco</span>
              Damata Grow
            </Link>
            
            <nav className={styles.nav} ref={navRef}>
              <Link href="/" className={styles.navLink}>Início</Link>
              
              {/* Products Mega Menu */}
              <div 
                className={styles.navDropdown}
                onMouseEnter={() => handleDropdownEnter('produtos')}
                onMouseLeave={handleDropdownLeave}
              >
                <Link href="/produtos" className={styles.navLink}>
                  Produtos
                  <span className="material-symbols-outlined">expand_more</span>
                </Link>
                {activeDropdown === 'produtos' && (
                  <div className={styles.megaMenu}>
                    <div className={styles.megaMenuContent}>
                      <div className={styles.megaMenuColumn}>
                        <h4>Categorias</h4>
                        <Link href="/produtos" onClick={handleDropdownLeave}>Ver Todos</Link>
                        {categories.map(cat => (
                          <Link 
                            key={cat} 
                            href={`/produtos?categoria=${encodeURIComponent(cat)}`}
                            onClick={handleDropdownLeave}
                          >
                            {cat}
                          </Link>
                        ))}
                      </div>
                      <div className={styles.megaMenuColumn}>
                        <h4>Destaques</h4>
                        <Link href="/produtos?destaque=true" onClick={handleDropdownLeave}>Mais Vendidos</Link>
                        <Link href="/produtos?ordem=recentes" onClick={handleDropdownLeave}>Lançamentos</Link>
                        <Link href="/produtos?ordem=preco-baixo" onClick={handleDropdownLeave}>Menores Preços</Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/quem-somos" className={styles.navLink}>Quem Somos</Link>
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

              {!loading && (
                user ? (
                  <div className={styles.userMenuWrapper} ref={userMenuRef}>
                    <button 
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className={styles.userBtn}
                      title="Menu do usuário"
                    >
                      <span className="material-symbols-outlined">person</span>
                      <span className={styles.userName}>Olá, {getFirstName(user.name)}</span>
                    </button>

                    {showUserMenu && (
                      <div className={styles.userMenu}>
                        <div className={styles.userMenuHeader}>
                          <span className="material-symbols-outlined">account_circle</span>
                          <div>
                            <p className={styles.userMenuName}>{user.name}</p>
                            <p className={styles.userMenuEmail}>{user.email}</p>
                          </div>
                        </div>
                        <div className={styles.userMenuDivider} />
                        <Link 
                          href="/minha-conta" 
                          className={styles.userMenuItem}
                          onClick={() => setShowUserMenu(false)}
                        >
                          <span className="material-symbols-outlined">settings</span>
                          Minha Conta
                        </Link>
                        <Link 
                          href="/meus-pedidos" 
                          className={styles.userMenuItem}
                          onClick={() => setShowUserMenu(false)}
                        >
                          <span className="material-symbols-outlined">shopping_bag</span>
                          Meus Pedidos
                        </Link>
                        <div className={styles.userMenuDivider} />
                        <button 
                          onClick={handleLogout}
                          className={styles.userMenuItem}
                        >
                          <span className="material-symbols-outlined">logout</span>
                          Sair
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button 
                    onClick={() => setShowAuthModal(true)} 
                    className="icon-btn"
                    title="Entrar / Cadastrar"
                  >
                    <span className="material-symbols-outlined">person</span>
                  </button>
                )
              )}

              <Link href="/carrinho" className={styles.cartBtn}>
                <span className="material-symbols-outlined">shopping_cart</span>
                {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
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
