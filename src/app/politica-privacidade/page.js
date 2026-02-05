"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContent } from "@/context/ContentContext";
import styles from "./page.module.css";

export default function PoliticaPrivacidade() {
  const { content } = useContent();

  const defaultContent = `
## Política de Privacidade

A Damata Grow está comprometida em proteger sua privacidade. Esta política descreve como coletamos, usamos e protegemos suas informações pessoais.

### Informações Coletadas

Coletamos informações que você nos fornece diretamente, como nome, email, endereço e telefone ao criar uma conta ou fazer uma compra.

### Uso das Informações

Usamos suas informações para:
- Processar pedidos e entregas
- Enviar atualizações sobre seus pedidos
- Melhorar nossos serviços
- Enviar comunicações de marketing (com seu consentimento)

### Proteção de Dados

Implementamos medidas de segurança para proteger suas informações pessoais contra acesso não autorizado.

### Contato

Para dúvidas sobre esta política, entre em contato conosco.
  `.trim();

  const policyContent = content?.privacyPolicy || defaultContent;

  // Simple markdown to HTML conversion
  const formatContent = (text) => {
    return text
      .split('\n\n')
      .map((paragraph, i) => {
        if (paragraph.startsWith('## ')) {
          return <h2 key={i} className={styles.heading}>{paragraph.replace('## ', '')}</h2>;
        }
        if (paragraph.startsWith('### ')) {
          return <h3 key={i} className={styles.subheading}>{paragraph.replace('### ', '')}</h3>;
        }
        if (paragraph.startsWith('- ')) {
          const items = paragraph.split('\n').filter(l => l.startsWith('- '));
          return (
            <ul key={i} className={styles.list}>
              {items.map((item, j) => <li key={j}>{item.replace('- ', '')}</li>)}
            </ul>
          );
        }
        return <p key={i}>{paragraph}</p>;
      });
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={`container ${styles.main}`}>
        <div className={styles.content}>
          <h1 className={styles.title}>Política de Privacidade</h1>
          <div className={styles.textContent}>
            {formatContent(policyContent)}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
