"use client";

import Link from "next/link";
import { useProducts } from "@/context/ProductContext";
import styles from "../page.module.css"; // Reuse dashboard styles where possible

export default function AdminProducts() {
  const { products, deleteProduct, updateProduct } = useProducts();

  const handleDelete = (id) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      deleteProduct(id);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className={styles.title} style={{ marginBottom: 0 }}>Gerenciar Produtos</h1>
        <Link 
            href="/admin/produtos/novo" 
            style={{ 
                backgroundColor: 'var(--primary-green)', 
                color: 'white', 
                padding: '0.75rem 1.5rem', 
                borderRadius: 'var(--radius-md)',
                fontWeight: 'bold',
                textDecoration: 'none'
            }}
        >
            + Novo Produto
        </Link>
      </div>
      
      <div className={styles.recentOrders}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>#{product.id}</td>
                <td>
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} 
                    />
                </td>
                <td>{product.name}</td>
                <td>R$ {product.price.toFixed(2).replace('.', ',')}</td>
                <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>{product.stock} un.</span>
                    </div>
                </td>
                <td>{product.category}</td>
                <td>
                    <Link 
                        href={`/admin/produtos/${product.id}`}
                        style={{ marginRight: '1rem', color: '#1565C0', textDecoration: 'none', fontWeight: 'bold' }}
                    >
                        Editar
                    </Link>
                    <button 
                        onClick={() => handleDelete(product.id)}
                        style={{ color: '#D32F2F', background: 'none', fontWeight: 'bold' }}
                    >
                        Excluir
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
