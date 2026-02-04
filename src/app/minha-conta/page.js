"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export default function MinhaConta() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch('/api/users/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name
        })
      });

      if (res.ok) {
        setMessage({ type: 'success', text: 'Dados atualizados com sucesso!' });
      } else {
        const data = await res.json();
        setMessage({ type: 'error', text: data.error || 'Erro ao atualizar dados' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro de conexão' });
    }

    setSaving(false);
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
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
        <h1 className={styles.title}>Minha Conta</h1>

        <div className={styles.grid}>
          <div className={styles.sidebar}>
            <nav className={styles.nav}>
              <a href="/minha-conta" className={`${styles.navItem} ${styles.active}`}>
                <span className="material-symbols-outlined">person</span>
                Meus Dados
              </a>
              <a href="/meus-pedidos" className={styles.navItem}>
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
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Informações Pessoais</h2>
              
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.field}>
                  <label>Nome Completo</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className={styles.disabled}
                  />
                  <small>O email não pode ser alterado</small>
                </div>

                {message.text && (
                  <p className={message.type === 'success' ? styles.success : styles.error}>
                    {message.text}
                  </p>
                )}

                <button type="submit" className={styles.saveBtn} disabled={saving}>
                  {saving ? 'Salvando...' : 'Salvar Alterações'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
