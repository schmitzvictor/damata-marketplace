"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContent } from "@/context/ContentContext";
import styles from "../politica-privacidade/page.module.css";

export default function TermosUso() {
  const { content } = useContent();

  const defaultContent = `
## Termos de Uso

Bem-vindo à Damata Grow! Ao acessar e usar nosso site, você concorda com estes termos.

### Uso do Site

Você concorda em usar o site apenas para fins legais e de acordo com estes termos.

### Propriedade Intelectual

Todo o conteúdo do site, incluindo textos, imagens e logos, são propriedade da Damata Grow.

### Compras

Ao realizar uma compra, você concorda em fornecer informações precisas e atualizadas.

### Limitação de Responsabilidade

A Damata Grow não se responsabiliza por danos indiretos resultantes do uso do site.

### Alterações

Podemos alterar estes termos a qualquer momento. Recomendamos que verifique periodicamente.

### Contato

Para dúvidas sobre estes termos, entre em contato conosco.
  `.trim();

  const termsContent = content?.termsOfUse || defaultContent;

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
          <h1 className={styles.title}>Termos de Uso</h1>
          <div className={styles.textContent}>
            {formatContent(termsContent)}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
