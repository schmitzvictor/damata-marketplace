"use client";

import { useState, useEffect } from "react";
import { useContent } from "@/context/ContentContext";
import { useRouter } from "next/navigation";
import styles from "../../page.module.css"; // Admin shared styles

export default function AdminSettings() {
  const { content, updateContent } = useContent();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    aboutUsTitle: "",
    aboutUsText: "",
    whatsapp: "",
    instagram: "",
    facebook: ""
  });

  useEffect(() => {
    if (content) {
        setFormData({
            aboutUsTitle: content.aboutUsTitle || "",
            aboutUsText: content.aboutUsText || "",
            whatsapp: content.whatsapp || "",
            instagram: content.socials?.instagram || "",
            facebook: content.socials?.facebook || ""
        });
    }
  }, [content]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateContent({
        aboutUsTitle: formData.aboutUsTitle,
        aboutUsText: formData.aboutUsText,
        whatsapp: formData.whatsapp,
        socials: {
            instagram: formData.instagram,
            facebook: formData.facebook
        }
    });
    alert("Configurações salvas com sucesso!");
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
      <h1 className={styles.title}>Configurações do Site</h1>
      
      <div className={styles.recentOrders} style={{ maxWidth: '800px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <section>
                <h2 style={{fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--primary-green)'}}>Página "Quem Somos"</h2>
                <div style={{marginBottom: '1rem'}}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Título</label>
                    <input 
                        type="text" 
                        name="aboutUsTitle"
                        value={formData.aboutUsTitle}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Texto (Use quebras de linha para parágrafos)</label>
                    <textarea 
                        name="aboutUsText"
                        value={formData.aboutUsText}
                        onChange={handleChange}
                        rows="6"
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', fontFamily: 'inherit' }}
                    />
                </div>
            </section>

            <section>
                <h2 style={{fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--primary-green)'}}>Contato e Redes Sociais</h2>
                <div style={{marginBottom: '1rem'}}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>WhatsApp (Apenas números, com DDD)</label>
                    <input 
                        type="text" 
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        placeholder="5548999999999"
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>
                <div style={{marginBottom: '1rem'}}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Instagram (URL)</label>
                    <input 
                        type="text" 
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

            </section>

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
                Salvar Alterações
            </button>
        </form>
      </div>
    </div>
  );
}
