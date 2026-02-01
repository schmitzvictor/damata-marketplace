"use client";

import Link from "next/link";
import { useSales } from "@/context/SalesContext";
import styles from "../page.module.css"; 

export default function AdminSales() {
  const { orders } = useSales();

  return (
    <div>
      <h1 className={styles.title}>Vendas Realizadas</h1>
      
      <div className={styles.recentOrders}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID Pedido</th>
              <th>Data</th>
              <th>Cliente</th>
              <th>Itens</th>
              <th>Total</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{new Date(order.date).toLocaleDateString('pt-BR')}</td>
                <td>{order.customer}</td>
                <td>{order.items}</td>
                <td>R$ {order.total.toFixed(2).replace('.', ',')}</td>
                <td>
                    <span 
                        style={{
                            padding: '4px 8px', 
                            borderRadius: '4px',
                            fontSize: '0.875rem',
                            backgroundColor: order.status === 'Pago' || order.status === 'Entregue' ? '#E8F5E9' : '#FFF3E0',
                            color: order.status === 'Pago' || order.status === 'Entregue' ? '#2E7D32' : '#E65100'
                        }}
                    >
                        {order.status}
                    </span>
                </td>
                <td>
                    <Link href={`/admin/vendas/${order.id}`} style={{ textDecoration: 'none', color: '#1565C0', fontWeight: 'bold' }}>
                        Ver Detalhes
                    </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
