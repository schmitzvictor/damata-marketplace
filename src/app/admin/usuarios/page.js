"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../page.module.css";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlock = async (userId) => {
    if (!confirm("Deseja desbloquear esta conta?")) return;

    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetLockout: true })
      });

      if (res.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error("Error unlocking user:", error);
    }
  };

  const handleDelete = async (userId) => {
    if (!confirm("Tem certeza que deseja deletar este usuário? Esta ação não pode ser desfeita.")) return;

    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "DELETE"
      });

      if (res.ok) {
        setUsers(users.filter(u => u.id !== userId));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const isLocked = (user) => {
    return user.lockedUntil && new Date(user.lockedUntil) > new Date();
  };

  if (loading) return <div style={{ padding: '2rem' }}>Carregando...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className={styles.title}>Gerenciar Usuários</h1>
        <Link 
          href="/admin/usuarios/novo"
          className="btn btn-primary"
        >
          <span className="material-symbols-outlined">add</span>
          Novo Usuário
        </Link>
      </div>

      <div className={styles.recentOrders}>
        <table className={styles.ordersTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Papel</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span style={{
                    background: user.role === 'admin' ? '#e3f2fd' : 'var(--bg-light)',
                    color: user.role === 'admin' ? '#1565c0' : 'var(--text-secondary)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '1rem',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>
                      {user.role === 'admin' ? 'verified_user' : 'person'}
                    </span>
                    {user.role === 'admin' ? 'Admin' : 'Usuário'}
                  </span>
                </td>
                <td>
                  {isLocked(user) ? (
                    <span style={{ color: '#d32f2f', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>lock</span>
                      Bloqueado
                    </span>
                  ) : (
                    <span style={{ color: '#2e7d32', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>check_circle</span>
                      Ativo
                    </span>
                  )}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link 
                      href={`/admin/usuarios/${user.id}`}
                      className="icon-btn"
                      title="Editar"
                    >
                      <span className="material-symbols-outlined" style={{ color: '#1565c0' }}>edit</span>
                    </Link>
                    {isLocked(user) && (
                      <button
                        onClick={() => handleUnlock(user.id)}
                        className="icon-btn"
                        title="Desbloquear"
                      >
                        <span className="material-symbols-outlined" style={{ color: '#ff9800' }}>lock_open</span>
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="icon-btn"
                      title="Deletar"
                    >
                      <span className="material-symbols-outlined" style={{ color: '#d32f2f' }}>delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
            Nenhum usuário cadastrado. Clique em "Novo Usuário" para criar.
          </p>
        )}
      </div>
    </div>
  );
}
