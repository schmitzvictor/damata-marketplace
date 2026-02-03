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
        fetchUsers(); // Refresh list
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
          style={{
            background: '#2E7D32',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            fontWeight: '600',
            textDecoration: 'none'
          }}
        >
          + Novo Usuário
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
                    background: user.role === 'admin' ? '#e3f2fd' : '#f5f5f5',
                    color: user.role === 'admin' ? '#1565c0' : '#666',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '1rem',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}>
                    {user.role === 'admin' ? '👑 Admin' : '👤 Usuário'}
                  </span>
                </td>
                <td>
                  {isLocked(user) ? (
                    <span style={{ color: '#d32f2f', fontWeight: '600' }}>🔒 Bloqueado</span>
                  ) : (
                    <span style={{ color: '#2e7d32' }}>✅ Ativo</span>
                  )}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link 
                      href={`/admin/usuarios/${user.id}`}
                      style={{ color: '#1565c0', textDecoration: 'none' }}
                    >
                      ✏️ Editar
                    </Link>
                    {isLocked(user) && (
                      <button
                        onClick={() => handleUnlock(user.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#ff9800',
                          cursor: 'pointer',
                          padding: 0
                        }}
                      >
                        🔓 Desbloquear
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(user.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#d32f2f',
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      🗑️ Deletar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
            Nenhum usuário cadastrado. Clique em "+ Novo Usuário" para criar.
          </p>
        )}
      </div>
    </div>
  );
}
