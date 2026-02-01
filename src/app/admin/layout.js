"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from "./admin.module.css";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  /* Middleware handles auth now */

  const handleLogout = async () => {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
  };

  if (pathname === "/admin/login") {
      return children;
  }

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>Da Mata Admin</div>
        <nav className={styles.nav}>
          <Link href="/admin" className={styles.navLink}>📊 Dashboard</Link>
          <Link href="/admin/produtos" className={styles.navLink}>📦 Produtos</Link>
          <Link href="/admin/blog" className={styles.navLink}>📝 Blog</Link>
          <Link href="/admin/vendas" className={styles.navLink}>💰 Vendas</Link>
          <Link href="/admin/configuracoes" className={styles.navLink}>⚙️ Configurações</Link>
          <button 
                onClick={handleLogout} 
                className={styles.navLink} 
                style={{background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '1rem', color: '#ff5252', marginTop: 'auto'}}
            >
                🚪 Sair
            </button>
          <div className={styles.divider}></div>
          <Link href="/" className={styles.navLink}>🏠 Voltar ao Site</Link>
        </nav>
      </aside>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
