"use client";

import { useProducts } from "@/context/ProductContext";
import styles from "./page.module.css";

export default function AdminDashboard() {
  const { products } = useProducts();
  
  // Mock stats
  const stats = [
    { title: "Vendas Totais", value: "R$ 12.450,00", color: "#2E7D32" },
    { title: "Pedidos Hoje", value: "15", color: "#1565C0" },
    { title: "Produtos Ativos", value: products.length, color: "#EF6C00" },
    { title: "Estoque Baixo", value: "3", color: "#D32F2F" },
  ];

  return (
    <div>
      <h1 className={styles.title}>Dashboard</h1>
      
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard} style={{ borderTopColor: stat.color }}>
            <h3 className={styles.statTitle}>{stat.title}</h3>
            <p className={styles.statValue} style={{ color: stat.color }}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className={styles.recentOrders}>
        <h2>Vendas Recentes</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#1023</td>
              <td>Maria Silva</td>
              <td>R$ 259,80</td>
              <td><span className={styles.badgeSuccess}>Pago</span></td>
            </tr>
            <tr>
              <td>#1022</td>
              <td>João Souza</td>
              <td>R$ 89,90</td>
              <td><span className={styles.badgeWarning}>Pendente</span></td>
            </tr>
            <tr>
              <td>#1021</td>
              <td>Ana Costa</td>
              <td>R$ 149,90</td>
              <td><span className={styles.badgeSuccess}>Pago</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
