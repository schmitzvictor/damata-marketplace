"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useProducts } from "@/context/ProductContext";
import styles from "../../page.module.css"; 

// Need to match exactly the path structure. If the path is /admin/produtos/[id], then this file should be page.js inside that folder.
export default function EditProduct({ params }) {
  const resolvedParams = use(params);
  const { getProductById, updateProduct } = useProducts();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Camisetas",
    size: "M",
    image: "",
    featured: false,
    stock: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const product = getProductById(resolvedParams.id);
    if (product) {
        setFormData({
            ...product,
            price: product.price, // Keep as number, input handles it or convert
        });
        setLoading(false);
    } else {
        // If not found (or context not loaded yet), wait or redirect
        // In a real app we might fetch. Here context loads from localstorage.
        // If still not found after a bit, maybe redirect.
        if (typeof window !== 'undefined' && localStorage.getItem("daMataProducts")) {
             // If data exists but product not found, it's invalid ID
        }
    }
  }, [resolvedParams.id, getProductById]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct(parseInt(resolvedParams.id), {
        ...formData,
        price: parseFloat(formData.price)
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

  if (loading) return <div style={{padding: '2rem'}}>Carregando...</div>;

  return (
    <div>
      <h1 className={styles.title}>Editar Produto #{resolvedParams.id}</h1>
      
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

            <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
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
                <div style={{ flex: 1 }}>
                     <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Estoque</label>
                     <input 
                        type="number" 
                        name="stock"
                        value={formData.stock || 0}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>
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
                    backgroundColor: '#1565C0', 
                    color: 'white', 
                    padding: '1rem', 
                    borderRadius: 'var(--radius-md)',
                    fontWeight: 'bold',
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                Atualizar Produto
            </button>
        </form>
      </div>
    </div>
  );
}
