"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import styles from "../../page.module.css";

export default function EditUser({ params }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  useEffect(() => {
    fetchUser();
  }, [resolvedParams.id]);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/users");
      if (res.ok) {
        const users = await res.json();
        const user = users.find(u => u.id === parseInt(resolvedParams.id));
        if (user) {
          setFormData({
            name: user.name,
            email: user.email,
            password: "", // Don't show password
            role: user.role
          });
        }
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const updateData = {
        name: formData.name,
        email: formData.email,
        role: formData.role
      };

      // Only include password if it was changed
      if (formData.password && formData.password.length >= 6) {
        updateData.password = formData.password;
      }

      const res = await fetch(`/api/users/${resolvedParams.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData)
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/admin/usuarios");
      } else {
        setError(data.error || "Erro ao atualizar usuário");
      }
    } catch (err) {
      setError("Erro de conexão");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ padding: '2rem' }}>Carregando...</div>;

  return (
    <div>
      <h1 className={styles.title}>Editar Usuário #{resolvedParams.id}</h1>

      <div className={styles.recentOrders} style={{ maxWidth: '600px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Nome</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Nova Senha <span style={{ color: '#666', fontWeight: 'normal' }}>(deixe vazio para manter a atual)</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              minLength={6}
              className={styles.input}
              placeholder="Nova senha (opcional)"
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Papel</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={styles.input}
            >
              <option value="user">👤 Usuário Normal</option>
              <option value="admin">👑 Administrador</option>
            </select>
          </div>

          {error && (
            <p style={{
              color: '#d32f2f',
              background: '#ffebee',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              fontSize: '0.9rem'
            }}>
              {error}
            </p>
          )}

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button
              type="submit"
              disabled={saving}
              style={{
                flex: 1,
                background: '#1565c0',
                color: 'white',
                padding: '1rem',
                borderRadius: '0.5rem',
                border: 'none',
                fontWeight: '700',
                cursor: saving ? 'not-allowed' : 'pointer',
                opacity: saving ? 0.7 : 1
              }}
            >
              {saving ? "Salvando..." : "Salvar Alterações"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              style={{
                padding: '1rem 2rem',
                borderRadius: '0.5rem',
                border: '1px solid #ccc',
                background: 'white',
                cursor: 'pointer'
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
