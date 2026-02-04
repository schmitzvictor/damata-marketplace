"use client";

import { useState, useEffect } from "react";
import { useContent } from "@/context/ContentContext";
import styles from "../../page.module.css";

export default function AdminSettings() {
  const { content, updateContent } = useContent();
  
  const [formData, setFormData] = useState({
    aboutUsTitle: "",
    aboutUsText: "",
    whatsapp: "",
    instagram: "",
    facebook: "",
    twitter: "",
    youtube: "",
    tiktok: "",
    linkedin: "",
    pinterest: ""
  });

  useEffect(() => {
    if (content) {
        setFormData({
            aboutUsTitle: content.aboutUsTitle || "",
            aboutUsText: content.aboutUsText || "",
            whatsapp: content.whatsapp || "",
            instagram: content.socials?.instagram || "",
            facebook: content.socials?.facebook || "",
            twitter: content.socials?.twitter || "",
            youtube: content.socials?.youtube || "",
            tiktok: content.socials?.tiktok || "",
            linkedin: content.socials?.linkedin || "",
            pinterest: content.socials?.pinterest || ""
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
            instagram: formData.instagram || null,
            facebook: formData.facebook || null,
            twitter: formData.twitter || null,
            youtube: formData.youtube || null,
            tiktok: formData.tiktok || null,
            linkedin: formData.linkedin || null,
            pinterest: formData.pinterest || null
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

  const inputStyle = { 
    width: '100%', 
    padding: '0.75rem', 
    borderRadius: '4px', 
    border: '1px solid var(--border-color)',
    background: 'var(--bg-white)',
    color: 'var(--text-primary)'
  };

  const labelStyle = { 
    display: 'block', 
    marginBottom: '0.5rem', 
    fontWeight: '600',
    color: 'var(--text-primary)'
  };

  return (
    <div>
      <h1 className={styles.title}>Configurações do Site</h1>
      
      <div className={styles.recentOrders} style={{ maxWidth: '800px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <section>
                <h2 style={{fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--primary-green)'}}>Página "Quem Somos"</h2>
                <div style={{marginBottom: '1rem'}}>
                    <label style={labelStyle}>Título</label>
                    <input 
                        type="text" 
                        name="aboutUsTitle"
                        value={formData.aboutUsTitle}
                        onChange={handleChange}
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label style={labelStyle}>Texto (Use quebras de linha para parágrafos)</label>
                    <textarea 
                        name="aboutUsText"
                        value={formData.aboutUsText}
                        onChange={handleChange}
                        rows="6"
                        style={{ ...inputStyle, fontFamily: 'inherit' }}
                    />
                </div>
            </section>

            <section>
                <h2 style={{fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--primary-green)'}}>Contato</h2>
                <div style={{marginBottom: '1rem'}}>
                    <label style={labelStyle}>WhatsApp (Apenas números, com código do país e DDD)</label>
                    <input 
                        type="text" 
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        placeholder="5548999999999"
                        style={inputStyle}
                    />
                </div>
            </section>

            <section>
                <h2 style={{fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--primary-green)'}}>Redes Sociais</h2>
                <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '1rem' }}>
                    Deixe em branco para não exibir. Informe a URL completa.
                </p>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={labelStyle}>📸 Instagram</label>
                        <input 
                            type="url" 
                            name="instagram"
                            value={formData.instagram}
                            onChange={handleChange}
                            placeholder="https://instagram.com/seu_perfil"
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>📘 Facebook</label>
                        <input 
                            type="url" 
                            name="facebook"
                            value={formData.facebook}
                            onChange={handleChange}
                            placeholder="https://facebook.com/sua_pagina"
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>🐦 Twitter / X</label>
                        <input 
                            type="url" 
                            name="twitter"
                            value={formData.twitter}
                            onChange={handleChange}
                            placeholder="https://twitter.com/seu_perfil"
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>📺 YouTube</label>
                        <input 
                            type="url" 
                            name="youtube"
                            value={formData.youtube}
                            onChange={handleChange}
                            placeholder="https://youtube.com/@seu_canal"
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>🎵 TikTok</label>
                        <input 
                            type="url" 
                            name="tiktok"
                            value={formData.tiktok}
                            onChange={handleChange}
                            placeholder="https://tiktok.com/@seu_perfil"
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>💼 LinkedIn</label>
                        <input 
                            type="url" 
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleChange}
                            placeholder="https://linkedin.com/company/sua_empresa"
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>📌 Pinterest</label>
                        <input 
                            type="url" 
                            name="pinterest"
                            value={formData.pinterest}
                            onChange={handleChange}
                            placeholder="https://pinterest.com/seu_perfil"
                            style={inputStyle}
                        />
                    </div>
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
