"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export default function MeusPedidos() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/users/me/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusLabel = (status) => {
    const statusMap = {
      pending: 'Pendente',
      confirmed: 'Confirmado',
      shipped: 'Enviado',
      delivered: 'Entregue',
      cancelled: 'Cancelado'
    };
    return statusMap[status] || status;
  };

  const getStatusClass = (status) => {
    const classMap = {
      pending: styles.statusPending,
      confirmed: styles.statusConfirmed,
      shipped: styles.statusShipped,
      delivered: styles.statusDelivered,
      cancelled: styles.statusCancelled
    };
    return classMap[status] || '';
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <Header />
        <main className={`container ${styles.main}`}>
          <p>Carregando...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className={styles.page}>
      <Header />
      <main className={`container ${styles.main}`}>
        <h1 className={styles.title}>Meus Pedidos</h1>

        <div className={styles.grid}>
          <div className={styles.sidebar}>
            <nav className={styles.nav}>
              <a href="/minha-conta" className={styles.navItem}>
                <span className="material-symbols-outlined">person</span>
                Meus Dados
              </a>
              <a href="/meus-pedidos" className={`${styles.navItem} ${styles.active}`}>
                <span className="material-symbols-outlined">shopping_bag</span>
                Meus Pedidos
              </a>
              <button onClick={handleLogout} className={styles.navItem}>
                <span className="material-symbols-outlined">logout</span>
                Sair
              </button>
            </nav>
          </div>

          <div className={styles.content}>
            {loadingOrders ? (
              <div className={styles.card}>
                <p>Carregando pedidos...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className={styles.emptyState}>
                <span className="material-symbols-outlined">shopping_bag</span>
                <h2>Nenhum pedido encontrado</h2>
                <p>Você ainda não fez nenhum pedido.</p>
                <Link href="/produtos" className={styles.shopBtn}>
                  Explorar Produtos
                </Link>
              </div>
            ) : (
              <div className={styles.ordersList}>
                {orders.map(order => (
                  <div key={order.id} className={styles.orderCard}>
                    <div className={styles.orderHeader}>
                      <div>
                        <span className={styles.orderNumber}>Pedido #{order.id.slice(-8)}</span>
                        <span className={styles.orderDate}>{formatDate(order.createdAt)}</span>
                      </div>
                      <span className={`${styles.status} ${getStatusClass(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                    
                    <div className={styles.orderItems}>
                      {order.items?.slice(0, 3).map((item, idx) => (
                        <div key={idx} className={styles.orderItem}>
                          <span className={styles.itemName}>{item.productName}</span>
                          <span className={styles.itemQty}>x{item.quantity}</span>
                        </div>
                      ))}
                      {order.items?.length > 3 && (
                        <p className={styles.moreItems}>
                          + {order.items.length - 3} item(s)
                        </p>
                      )}
                    </div>
                    
                    <div className={styles.orderFooter}>
                      <span className={styles.orderTotal}>
                        Total: {formatCurrency(order.total)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
