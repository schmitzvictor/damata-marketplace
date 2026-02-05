"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import styles from "./admin.module.css";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

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
        <div className={styles.logo}>
          <span className="material-symbols-outlined" style={{ color: '#4caf50' }}>eco</span>
          Damata Admin
        </div>
        <nav className={styles.nav}>
          <Link href="/admin" className={styles.navLink}>
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </Link>
          <Link href="/admin/produtos" className={styles.navLink}>
            <span className="material-symbols-outlined">inventory_2</span>
            Produtos
          </Link>
          <Link href="/admin/blog" className={styles.navLink}>
            <span className="material-symbols-outlined">edit</span>
            Blog
          </Link>
          <Link href="/admin/vendas" className={styles.navLink}>
            <span className="material-symbols-outlined">payments</span>
            Vendas
          </Link>
          <Link href="/admin/usuarios" className={styles.navLink}>
            <span className="material-symbols-outlined">group</span>
            Usuários
          </Link>
          <Link href="/admin/paginas" className={styles.navLink}>
            <span className="material-symbols-outlined">edit</span>
            Páginas
          </Link>
          <Link href="/admin/configuracoes" className={styles.navLink}>
            <span className="material-symbols-outlined">settings</span>
            Configurações
          </Link>
          
          <div className={styles.divider}></div>
          
          <button onClick={handleLogout} className={`${styles.navLink} ${styles.logoutBtn}`}>
            <span className="material-symbols-outlined">logout</span>
            Sair
          </button>
          
          <Link href="/" className={styles.navLink}>
            <span className="material-symbols-outlined">home</span>
            Voltar ao Site
          </Link>
        </nav>
      </aside>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
