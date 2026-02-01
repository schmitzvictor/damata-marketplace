"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (res.ok && data.success) {
            // Cookie is set by server automatically
            router.push("/admin");
            router.refresh(); // Refresh to ensure middleware catches the new cookie state if prefetching
        } else {
            setError(data.error || "Login falhou");
        }
    } catch (err) {
        setError("Erro de conexão");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.form}>
        <h1 className={styles.title}>Admin Login</h1>
        {error && <p className={styles.error}>{error}</p>}
        
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        
        <button type="submit" className={styles.button}>Entrar</button>
        <p style={{fontSize: '0.8rem', marginTop: '1rem', color: '#666'}}>
            (Use: admin / da-mata)
        </p>
      </form>
    </div>
  );
}
