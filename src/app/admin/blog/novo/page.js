"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBlog } from "@/context/BlogContext";
import styles from "../../page.module.css"; 

export default function AddPost() {
  const { addPost } = useBlog();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: "https://placehold.co/800x400/2E7D32/FFFFFF?text=Novo+Post",
    author: "Admin"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost(formData);
    router.push("/admin/blog");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: value
    }));
  };

  return (
    <div>
      <h1 className={styles.title}>Novo Post</h1>
      
      <div className={styles.recentOrders} style={{ maxWidth: '800px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Título</label>
                <input 
                    type="text" 
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                />
            </div>
            
             <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Resumo (Excerpt)</label>
                <input 
                    type="text" 
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                />
            </div>

            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Conteúdo</label>
                <textarea 
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                    rows="10"
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', fontFamily: 'inherit' }}
                />
            </div>

            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>URL da Imagem</label>
                <input 
                    type="text" 
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                />
            </div>

            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Autor</label>
                 <input 
                    type="text" 
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                />
            </div>

            <button 
                type="submit" 
                style={{ 
                    marginTop: '1rem',
                    backgroundColor: 'var(--primary-green)', 
                    color: 'white', 
                    padding: '1rem', 
                    borderRadius: 'var(--radius-md)',
                    fontWeight: 'bold',
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                Publicar Post
            </button>
        </form>
      </div>
    </div>
  );
}
