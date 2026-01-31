"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProducts } from "@/context/ProductContext";
import styles from "../../page.module.css"; 

export default function AddProduct() {
  const { addProduct } = useProducts();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Camisetas",
    size: "M",
    image: "https://placehold.co/400x500/2E7D32/FFFFFF?text=Novo+Produto",
    featured: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct({
        ...formData,
        price: parseFloat(formData.price) || 0,
        date: new Date().toISOString().split('T')[0] // Today's date
    });
    router.push("/admin/produtos");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div>
      <h1 className={styles.title}>Adicionar Produto</h1>
      
      <div className={styles.recentOrders} style={{ maxWidth: '600px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Nome do Produto</label>
                <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                />
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Preço (R$)</label>
                    <input 
                        type="number" 
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        step="0.01"
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Tamanho</label>
                    <select 
                        name="size"
                        value={formData.size}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                    >
                        <option value="P">P</option>
                        <option value="M">M</option>
                        <option value="G">G</option>
                        <option value="GG">GG</option>
                    </select>
                </div>
            </div>

            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Categoria</label>
                <select 
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                    <option value="Camisetas">Camisetas</option>
                    <option value="Vestidos">Vestidos</option>
                    <option value="Calças">Calças</option>
                    <option value="Bermudas">Bermudas</option>
                    <option value="Saias">Saias</option>
                </select>
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

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input 
                    type="checkbox" 
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    id="featured"
                />
                <label htmlFor="featured">Destaque na Home</label>
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
                Salvar Produto
            </button>
        </form>
      </div>
    </div>
  );
}
