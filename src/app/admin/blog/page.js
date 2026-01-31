"use client";

import Link from "next/link";
import { useBlog } from "@/context/BlogContext";
import styles from "../page.module.css"; 

export default function AdminBlog() {
  const { posts, deletePost } = useBlog();

  const handleDelete = (id) => {
    if (confirm("Tem certeza que deseja excluir este post?")) {
      deletePost(id);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className={styles.title} style={{ marginBottom: 0 }}>Gerenciar Blog</h1>
        <Link 
            href="/admin/blog/novo" 
            style={{ 
                backgroundColor: 'var(--primary-green)', 
                color: 'white', 
                padding: '0.75rem 1.5rem', 
                borderRadius: 'var(--radius-md)',
                fontWeight: 'bold',
                textDecoration: 'none'
            }}
        >
            + Novo Post
        </Link>
      </div>
      
      <div className={styles.recentOrders}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Autor</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id}>
                <td>#{post.id}</td>
                <td>{post.title}</td>
                <td>{post.author}</td>
                <td>{new Date(post.date).toLocaleDateString('pt-BR')}</td>
                <td>
                    <button 
                        onClick={() => handleDelete(post.id)}
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
