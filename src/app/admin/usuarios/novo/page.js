"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../page.module.css";

export default function NewUser() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/admin/usuarios");
      } else {
        setError(data.error || "Erro ao criar usuário");
      }
    } catch (err) {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className={styles.title}>Novo Usuário</h1>

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
              placeholder="Nome completo"
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
              placeholder="email@exemplo.com"
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Senha</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className={styles.input}
              placeholder="Mínimo 6 caracteres"
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
              disabled={loading}
              style={{
                flex: 1,
                background: '#2E7D32',
                color: 'white',
                padding: '1rem',
                borderRadius: '0.5rem',
                border: 'none',
                fontWeight: '700',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? "Salvando..." : "Criar Usuário"}
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
