"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "da-mata") {
      localStorage.setItem("adminToken", "true");
      router.push("/admin");
    } else {
      setError("Credenciais inválidas");
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
