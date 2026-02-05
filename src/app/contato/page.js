"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContent } from "@/context/ContentContext";
import { FaWhatsapp } from "react-icons/fa";
import styles from "./page.module.css";

export default function Contato() {
  const { content } = useContent();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    
    // Simulate sending (you can connect to an API later)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSending(false);
    setSent(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactTitle = content?.contactTitle || "Entre em Contato";
  const contactText = content?.contactText || "Ficou com alguma dúvida? Estamos aqui para ajudar!";

  return (
    <div className={styles.page}>
      <Header />
      <main className={`container ${styles.main}`}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{contactTitle}</h1>
          <p className={styles.subtitle}>{contactText}</p>

          <div className={styles.grid}>
            {/* Contact Info */}
            <div className={styles.infoSection}>
              <h2>Informações de Contato</h2>
              
              {content?.contactEmail && (
                <div className={styles.infoItem}>
                  <span className="material-symbols-outlined">mail</span>
                  <div>
                    <h4>Email</h4>
                    <a href={`mailto:${content.contactEmail}`}>{content.contactEmail}</a>
                  </div>
                </div>
              )}

              {content?.contactPhone && (
                <div className={styles.infoItem}>
                  <span className="material-symbols-outlined">phone</span>
                  <div>
                    <h4>Telefone</h4>
                    <p>{content.contactPhone}</p>
                  </div>
                </div>
              )}

              {content?.contactAddress && (
                <div className={styles.infoItem}>
                  <span className="material-symbols-outlined">location_on</span>
                  <div>
                    <h4>Endereço</h4>
                    <p>{content.contactAddress}</p>
                  </div>
                </div>
              )}

              {content?.whatsapp && (
                <a 
                  href={`https://wa.me/${content.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.whatsappBtn}
                >
                  <FaWhatsapp />
                  Fale pelo WhatsApp
                </a>
              )}
            </div>

            {/* Contact Form */}
            <div className={styles.formSection}>
              <h2>Envie uma Mensagem</h2>
              
              {sent ? (
                <div className={styles.successMessage}>
                  <span className="material-symbols-outlined">check_circle</span>
                  <h3>Mensagem Enviada!</h3>
                  <p>Obrigado pelo contato. Responderemos em breve.</p>
                  <button onClick={() => setSent(false)}>Enviar Outra</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label>Nome</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Seu nome"
                      />
                    </div>
                    <div className={styles.field}>
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label>Assunto</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Qual o assunto?"
                    />
                  </div>
                  <div className={styles.field}>
                    <label>Mensagem</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      placeholder="Escreva sua mensagem..."
                    />
                  </div>
                  <button type="submit" className={styles.submitBtn} disabled={sending}>
                    {sending ? "Enviando..." : "Enviar Mensagem"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
