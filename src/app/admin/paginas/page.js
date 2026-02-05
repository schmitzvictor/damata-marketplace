"use client";

import { useState, useEffect } from "react";
import { useContent } from "@/context/ContentContext";
import styles from "../../page.module.css";

export default function AdminPages() {
  const { content, updateContent } = useContent();
  const [activeTab, setActiveTab] = useState('homepage');
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    // Homepage
    heroTitle: "",
    heroSubtitle: "",
    ctaTitle: "",
    ctaSubtitle: "",
    // Privacy Policy
    privacyPolicy: "",
    // Terms of Use
    termsOfUse: "",
    // Contact
    contactTitle: "",
    contactText: "",
    contactEmail: "",
    contactPhone: "",
    contactAddress: ""
  });

  useEffect(() => {
    if (content) {
      setFormData({
        heroTitle: content.heroTitle || "Damata Grow",
        heroSubtitle: content.heroSubtitle || "Roupas feitas com a alma da natureza. Estilo, conforto e consciência ambiental em cada peça.",
        ctaTitle: content.ctaTitle || "Conecte-se com a Natureza",
        ctaSubtitle: content.ctaSubtitle || "Peças exclusivas, feitas à mão com materiais sustentáveis",
        privacyPolicy: content.privacyPolicy || "",
        termsOfUse: content.termsOfUse || "",
        contactTitle: content.contactTitle || "Entre em Contato",
        contactText: content.contactText || "Ficou com alguma dúvida? Entre em contato conosco!",
        contactEmail: content.contactEmail || "",
        contactPhone: content.contactPhone || "",
        contactAddress: content.contactAddress || ""
      });
    }
  }, [content]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    await updateContent(formData);
    
    setSaving(false);
    alert("Alterações salvas com sucesso!");
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

  const tabs = [
    { id: 'homepage', label: 'Página Inicial', icon: '🏠' },
    { id: 'privacy', label: 'Política de Privacidade', icon: '🔒' },
    { id: 'terms', label: 'Termos de Uso', icon: '📄' },
    { id: 'contact', label: 'Contato', icon: '📧' }
  ];

  return (
    <div>
      <h1 className={styles.title}>Gerenciar Páginas</h1>
      
      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.75rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              border: activeTab === tab.id ? '2px solid var(--primary-green)' : '2px solid var(--border-color)',
              background: activeTab === tab.id ? 'var(--primary-green)' : 'var(--bg-card)',
              color: activeTab === tab.id ? 'white' : 'var(--text-primary)',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.recentOrders} style={{ maxWidth: '900px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Homepage Tab */}
          {activeTab === 'homepage' && (
            <>
              <section>
                <h2 style={{fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--primary-green)'}}>
                  Seção Hero (Banner Principal)
                </h2>
                <div style={{marginBottom: '1rem'}}>
                  <label style={labelStyle}>Título Principal</label>
                  <input 
                    type="text" 
                    name="heroTitle"
                    value={formData.heroTitle}
                    onChange={handleChange}
                    placeholder="Damata Grow"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Subtítulo</label>
                  <textarea 
                    name="heroSubtitle"
                    value={formData.heroSubtitle}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Roupas feitas com a alma da natureza..."
                    style={{ ...inputStyle, fontFamily: 'inherit' }}
                  />
                </div>
              </section>

              <section>
                <h2 style={{fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--primary-green)'}}>
                  Banner CTA (Call to Action)
                </h2>
                <div style={{marginBottom: '1rem'}}>
                  <label style={labelStyle}>Título</label>
                  <input 
                    type="text" 
                    name="ctaTitle"
                    value={formData.ctaTitle}
                    onChange={handleChange}
                    placeholder="Conecte-se com a Natureza"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Subtítulo</label>
                  <input 
                    type="text" 
                    name="ctaSubtitle"
                    value={formData.ctaSubtitle}
                    onChange={handleChange}
                    placeholder="Peças exclusivas, feitas à mão..."
                    style={inputStyle}
                  />
                </div>
              </section>
            </>
          )}

          {/* Privacy Policy Tab */}
          {activeTab === 'privacy' && (
            <section>
              <h2 style={{fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--primary-green)'}}>
                Política de Privacidade
              </h2>
              <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '1rem' }}>
                Use quebras de linha para parágrafos. Você pode usar Markdown básico.
              </p>
              <div>
                <textarea 
                  name="privacyPolicy"
                  value={formData.privacyPolicy}
                  onChange={handleChange}
                  rows="20"
                  placeholder="Escreva aqui sua política de privacidade..."
                  style={{ ...inputStyle, fontFamily: 'inherit' }}
                />
              </div>
            </section>
          )}

          {/* Terms of Use Tab */}
          {activeTab === 'terms' && (
            <section>
              <h2 style={{fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--primary-green)'}}>
                Termos de Uso
              </h2>
              <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '1rem' }}>
                Use quebras de linha para parágrafos. Você pode usar Markdown básico.
              </p>
              <div>
                <textarea 
                  name="termsOfUse"
                  value={formData.termsOfUse}
                  onChange={handleChange}
                  rows="20"
                  placeholder="Escreva aqui seus termos de uso..."
                  style={{ ...inputStyle, fontFamily: 'inherit' }}
                />
              </div>
            </section>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <section>
              <h2 style={{fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--primary-green)'}}>
                Página de Contato
              </h2>
              <div style={{marginBottom: '1rem'}}>
                <label style={labelStyle}>Título da Página</label>
                <input 
                  type="text" 
                  name="contactTitle"
                  value={formData.contactTitle}
                  onChange={handleChange}
                  placeholder="Entre em Contato"
                  style={inputStyle}
                />
              </div>
              <div style={{marginBottom: '1rem'}}>
                <label style={labelStyle}>Texto Introdutório</label>
                <textarea 
                  name="contactText"
                  value={formData.contactText}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Ficou com alguma dúvida? Entre em contato conosco!"
                  style={{ ...inputStyle, fontFamily: 'inherit' }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>📧 Email</label>
                  <input 
                    type="email" 
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    placeholder="contato@damatagrow.com"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>📞 Telefone</label>
                  <input 
                    type="text" 
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    placeholder="(48) 99999-9999"
                    style={inputStyle}
                  />
                </div>
              </div>
              <div style={{marginTop: '1rem'}}>
                <label style={labelStyle}>📍 Endereço</label>
                <textarea 
                  name="contactAddress"
                  value={formData.contactAddress}
                  onChange={handleChange}
                  rows="2"
                  placeholder="Rua das Flores, 123 - Florianópolis, SC"
                  style={{ ...inputStyle, fontFamily: 'inherit' }}
                />
              </div>
            </section>
          )}

          <button 
            type="submit" 
            disabled={saving}
            style={{ 
              marginTop: '1rem',
              backgroundColor: 'var(--primary-green)', 
              color: 'white', 
              padding: '1rem', 
              borderRadius: 'var(--radius-md)',
              fontWeight: 'bold',
              border: 'none',
              cursor: saving ? 'not-allowed' : 'pointer',
              opacity: saving ? 0.7 : 1
            }}
          >
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </form>
      </div>
    </div>
  );
}
