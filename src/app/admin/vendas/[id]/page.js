"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import styles from "../../page.module.css"; // Reuse dashboard styles

export default function OrderDetails({ params }) {
  const resolvedParams = use(params);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      fetch(`/api/orders/${resolvedParams.id}`)
          .then(res => res.json())
          .then(data => {
              if (data.error) {
                  alert("Pedido não encontrado");
              } else {
                  setOrder(data);
              }
              setLoading(false);
          })
          .catch(err => {
              console.error(err);
              setLoading(false);
          });
  }, [resolvedParams.id]);

  if (loading) return <div style={{padding: '2rem'}}>Carregando detalhes...</div>;
  if (!order) return <div style={{padding: '2rem'}}>Pedido não encontrado.</div>;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link href="/admin/vendas" style={{ textDecoration: 'none', color: '#666' }}>
            ← Voltar
        </Link>
        <h1 className={styles.title} style={{ marginBottom: 0 }}>Pedido #{order.id}</h1>
        <span 
            style={{
                padding: '4px 8px', 
                borderRadius: '4px',
                fontSize: '0.875rem',
                backgroundColor: order.status === 'Pago' || order.status === 'Entregue' ? '#E8F5E9' : '#FFF3E0',
                color: order.status === 'Pago' || order.status === 'Entregue' ? '#2E7D32' : '#E65100',
                fontWeight: 'bold'
            }}
        >
            {order.status}
        </span>
      </div>

      <div className={styles.statsGrid} style={{ marginBottom: '2rem' }}>
        <div className={styles.statCard} style={{ borderTopColor: '#1565C0' }}>
            <h3 className={styles.statTitle}>Cliente</h3>
            <p className={styles.statValue} style={{fontSize: '1.2rem', color: '#333'}}>{order.customer}</p>
        </div>
        <div className={styles.statCard} style={{ borderTopColor: '#2E7D32' }}>
            <h3 className={styles.statTitle}>Total</h3>
            <p className={styles.statValue} style={{fontSize: '1.5rem', color: '#2E7D32'}}>
                R$ {order.total.toFixed(2).replace('.', ',')}
            </p>
        </div>
        <div className={styles.statCard} style={{ borderTopColor: '#EF6C00' }}>
            <h3 className={styles.statTitle}>Data</h3>
            <p className={styles.statValue} style={{fontSize: '1.2rem', color: '#333'}}>
                {new Date(order.date).toLocaleDateString('pt-BR')} {new Date(order.date).toLocaleTimeString('pt-BR')}
            </p>
        </div>
      </div>
      
      {/* Address Card */}
      <div style={{ 
          background: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '2rem'
      }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#333' }}>Endereço de Entrega</h2>
        <p><strong>Rua:</strong> {order.addressStreet}, {order.addressNumber}</p>
        <p><strong>Complemento:</strong> {order.addressComplement}</p>
        <p><strong>Bairro:</strong> {order.addressDistrict} - {order.addressCity}/{order.addressState}</p>
        <p><strong>CEP:</strong> {order.addressZip}</p>
        {order.addressReference && <p><strong>Ref:</strong> {order.addressReference}</p>}
      </div>
      
      <div className={styles.recentOrders}>
        <h2>Itens do Pedido</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Tamanho</th>
              <th>Preço Unit.</th>
              <th>Qtd.</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.orderItems?.map(item => (
              <tr key={item.id}>
                <td>{item.productName}</td>
                <td>{item.size}</td>
                <td>R$ {item.price.toFixed(2).replace('.', ',')}</td>
                <td>{item.quantity}</td>
                <td>R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</td>
              </tr>
            ))}
            {(!order.orderItems || order.orderItems.length === 0) && (
                <tr>
                    <td colSpan="5" style={{textAlign: 'center', padding: '2rem'}}>
                        Nenhum item registrado (Pedido antigo ou erro na criação)
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
