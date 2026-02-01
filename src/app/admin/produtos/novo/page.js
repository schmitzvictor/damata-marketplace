"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProducts } from "@/context/ProductContext";
import styles from "../../page.module.css"; 

export default function NewProduct() {
  const { addProduct } = useProducts();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Camisetas",
    image: "",
    featured: false,
    variants: [{ size: "M", stock: 10 }] // Start with one variant
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await addProduct({
        ...formData,
        price: parseFloat(formData.price),
        variants: formData.variants.map(v => ({...v, stock: parseInt(v.stock)}))
    });
    setLoading(false);
    router.push("/admin/produtos");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...formData.variants];
    newVariants[index][field] = value;
    setFormData(prev => ({ ...prev, variants: newVariants }));
  };

  const addVariant = () => {
    setFormData(prev => ({
        ...prev,
        variants: [...prev.variants, { size: "M", stock: 0 }]
    }));
  };

  const removeVariant = (index) => {
    setFormData(prev => ({
        ...prev,
        variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  return (
    <div>
      <h1 className={styles.title}>Novo Produto</h1>
      
      <div className={styles.recentOrders} style={{ maxWidth: '800px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
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
            </div>

            {/* Variants Section */}
            <div style={{ border: '1px solid #eee', padding: '1rem', borderRadius: '8px', backgroundColor: '#fafafa' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0 }}>Estoque por Tamanho</h3>
                    <button 
                        type="button" 
                        onClick={addVariant}
                        style={{ backgroundColor: '#2E7D32', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        + Adicionar Tamanho
                    </button>
                </div>
                
                {formData.variants.map((variant, index) => (
                    <div key={index} style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                        <select 
                            value={variant.size} 
                            onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', minWidth: '80px' }}
                        >
                             <option value="PP">PP</option>
                             <option value="P">P</option>
                             <option value="M">M</option>
                             <option value="G">G</option>
                             <option value="GG">GG</option>
                             <option value="XG">XG</option>
                        </select>
                        <input 
                            type="number" 
                            value={variant.stock} 
                            onChange={(e) => handleVariantChange(index, 'stock', e.target.value)}
                            placeholder="Estoque"
                            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '100px' }}
                        />
                         <button 
                            type="button" 
                            onClick={() => removeVariant(index)}
                            style={{ color: '#D32F2F', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            Remover
                        </button>
                    </div>
                ))}
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
                disabled={loading}
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
                {loading ? "Salvando..." : "Criar Produto"}
            </button>
        </form>
      </div>
    </div>
  );
}
